import React from "react";
import { motion } from "framer-motion";

interface BusinessModalProps {
    onClose: () => void;
}

const BusinessModal: React.FC<BusinessModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 text-white p-6 rounded-lg shadow-xl w-96"
            >
                <button
                    className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2 className="text-xl font-semibold text-purple-400 mb-4">
                    How AI Image Recognition Benefits Businesses
                </h2>

                <p className="text-gray-300 text-sm">
                    AI-powered image recognition helps businesses by:
                </p>
                <ul className="mt-3 text-gray-300 text-sm space-y-2">
                    <li>✅ Automating product tagging in e-commerce</li>
                    <li>✅ Enhancing security with facial recognition</li>
                    <li>✅ Improving customer experience with personalized recommendations</li>
                    <li>✅ Detecting counterfeit products in marketplaces</li>
                    <li>✅ Automating quality control in manufacturing</li>
                </ul>

                <button
                    className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold"
                    onClick={onClose}
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default BusinessModal;
