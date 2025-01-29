import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import Results from "./components/Results";

const App: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);

    return (
        <div className="flex flex-col items-center mt-10 content-center">
            <h1 className="text-2xl font-bold">AI Image Recognition</h1>
            <UploadForm setResults={setResults} />
            <Results results={results} />
        </div>
    );
};

export default App;
