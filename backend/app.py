from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import os
import cv2
import numpy as np
import tensorflow as tf

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# Limit TensorFlow CPU threads to prevent memory spikes
tf.config.threading.set_intra_op_parallelism_threads(1)
tf.config.threading.set_inter_op_parallelism_threads(1)

print("✅ TensorFlow running on CPU with memory optimization.")

# Only set memory growth if GPU is available
physical_devices = tf.config.list_physical_devices('GPU')
if physical_devices:
    try:
        tf.config.set_logical_device_configuration(
            physical_devices[0], [tf.config.LogicalDeviceConfiguration(memory_limit=512)]
        )
        print("GPU detected. Memory limit set to 512MB.")
    except Exception as e:
        print(f"Warning: Could not configure GPU memory: {e}")
else:
    print("No GPU found. Running TensorFlow on CPU.")


app = Flask(__name__)
FRONTEND_URLS = os.getenv("FRONTEND_URL", "http://localhost:5173", "http://127.0.0.1:5173").split(",")

CORS(app, resources={r"/*": {"origins": [FRONTEND_URLS]}}, supports_credentials=True)


model = tf.keras.models.load_model("my_model.h5", compile=False)
model.compile(optimizer="adam", loss="categorical_crossentropy")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

@app.route("/upload", methods=["POST", "OPTIONS"])
def upload_image():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Preprocess image
    image = cv2.imread(file_path)
    image = cv2.resize(image, (224, 224))
    image = np.expand_dims(image, axis=0) / 255.0

    # AI Model Prediction
    predictions = model.predict(image)
    decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)[0]

    results = [{"object": pred[1], "confidence": float(pred[2])} for pred in decoded_predictions]

    return jsonify(results), 200  # Ensure response status is 200

if __name__ == "__main__":
    app.run(debug=True)
