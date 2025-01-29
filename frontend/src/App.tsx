import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import Results from "./components/Results";
import BusinessModal from "./components/BusinessModal";
import { motion } from "framer-motion";

const App: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 text-white relative">
            <h1 className="text-4xl font-bold mb-6 text-purple-300 drop-shadow-lg">AI Image Recognition</h1>

            <UploadForm setResults={setResults}/>
            <Results results={results}/>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="fixed md:bottom-8 md:right-8 w-full md:w-72 px-4 md:px-6 py-3 bg-black text-white rounded-t-xl md:rounded-xl
                   shadow-lg cursor-pointer text-center md:text-left text-sm md:text-base
                   bottom-0 left-0 md:left-auto md:w-auto"
                onClick={() => setIsModalOpen(true)}
            >
                💡 Learn how AI Image recognition can benefit your business
            </motion.div>

            {isModalOpen && <BusinessModal onClose={() => setIsModalOpen(false)}/>}

            <footer className="mt-10 text-sm text-gray-400">
                Built with ❤️ by albeliaeva
            </footer>
        </div>
    );
};

export default App;
