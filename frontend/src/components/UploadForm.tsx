import React, { useState } from "react";
import axios from "axios";

const UploadForm: React.FC<{ setResults: React.Dispatch<React.SetStateAction<any[]>> }> = ({ setResults }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setPreview(URL.createObjectURL(selectedImage)); // Generate preview URL
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        setLoading(true); // Show loading animation

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
            });

            setResults(response.data);
        } catch (error: any) {
            console.error("Error uploading image:", error.response ? error.response.data : error.message);
            alert("Upload failed. Check backend logs.");
        } finally {
            setLoading(false); // Hide loading animation
        }
    };

    const removeImage = async (e: React.FormEvent) => {
        e.preventDefault();
        setImage(null);
        setPreview(null);
        setLoading(false);
        setResults([]);
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                {/* Image Upload Input & Mini Preview */}
                <div className="flex items-center space-x-4 mb-5">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border rounded-md cursor-pointer bg-white"
                    />
                </div>

                {preview && (
                        <img
                            src={preview}
                            alt="Mini Preview"
                            className="img-preview object-cover rounded-md border shadow-sm"
                        />
                )}

                {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                        <div className="w-5 h-5 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                        <span className="text-blue-500 font-semibold">Uploading...</span>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="upload-btn px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition p-5"
                    >
                        Upload
                    </button>
                )}
                {preview &&
                    <button
                        onClick={removeImage}
                        className="px-6 py-2 gray-500 text-white font-semibold rounded-md hover:bg-stone-950 transition p-5 bg-stone-500">
                        Remove
                    </button>
                }
            </form>
        </div>
    );
};

export default UploadForm;
