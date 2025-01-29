from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import os
import cv2
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)

# Load AI model
model = tf.keras.applications.MobileNetV2(weights="imagenet")

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
