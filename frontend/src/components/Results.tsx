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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 w-full max-w-md bg-gradient-to-br from-gray-900 to-purple-800 text-white shadow-lg rounded-lg p-6 border border-gray-700"
        >
            <h2 className="text-xl font-semibold text-center text-purple-400 mb-4">Recognition Results</h2>

            <div className="grid grid-cols-1 gap-4">
                {results.map((res, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-md shadow-md border border-purple-500"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }} // Stagger animation
                    >
                        <span className="text-purple-300 font-medium">{res.object}</span>
                        <span className="text-gray-300">{Math.round(res.confidence * 100)}%</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Results;
