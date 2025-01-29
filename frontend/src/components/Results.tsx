import React from "react";
import { motion } from "framer-motion";

interface Result {
    object: string;
    confidence: number;
}

interface Props {
    results: Result[];
}

const Results: React.FC<Props> = ({ results }) => {
    if (!results || results.length === 0) {
        return null; // Don't show if there are no results
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Animation: fade-in and move up
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 w-full max-w-md bg-white shadow-lg rounded-lg p-4 border border-gray-200"
        >
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Recognition Results</h2>

            <div className="grid grid-cols-2 gap-5">
                {results.map((res, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-md shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }} // Stagger animation
                    >
                        <span className="text-blue-800 font-medium">{res.object}</span>
                        <span className="text-gray-600">{Math.round(res.confidence * 100)}%</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Results;
