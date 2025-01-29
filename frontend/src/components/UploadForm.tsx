import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { motion } from "framer-motion";

const UploadForm: React.FC<{ setResults: React.Dispatch<React.SetStateAction<any[]>> }> = ({ setResults }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input

    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const handleImageChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleImageChange(e.dataTransfer.files);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        setLoading(true);
        setSuccessMessage(false);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("${import.meta.env.VITE_API_BASE_URL}", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
            });

            setResults(response.data);
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error: any) {
            console.error("Error uploading image:", error.response ? error.response.data : error.message);
            alert("Upload failed. Check backend logs.");
        } finally {
            setLoading(false);
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
        <div
            className="flex flex-col items-center p-6 rounded-lg shadow-xl w-full max-w-md bg-gradient-to-br from-gray-900 to-purple-800 text-white">
            <h2 className="text-2xl font-semibold mb-4">Upload an Image</h2>

            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
                <div
                    className="w-full p-6 border-2 border-dashed border-purple-500 rounded-md bg-gray-800 text-center cursor-pointer hover:bg-gray-700 transition relative"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <p className="text-gray-300">Drag & Drop an image here, or <span
                        className="text-purple-400 font-semibold">click to select</span></p>

                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files)}
                        className="hidden"
                    />
                </div>
                {preview && (
                    <img
                        src={preview}
                        alt="Mini Preview"
                        className="img-preview object-cover rounded-md border border-purple-400 shadow-lg"
                    />
                )}

                {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                        <div
                            className="w-5 h-5 border-4 border-purple-500 border-dotted rounded-full animate-spin"></div>
                        <span className="text-purple-400 font-semibold">Uploading...</span>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700
                         transition shadow-lg disabled:bg-gray-300"
                        disabled={!image}
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

            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg"
                >
                    ✅ Image uploaded successfully!
                </motion.div>
            )}
        </div>
    );
};

export default UploadForm;
