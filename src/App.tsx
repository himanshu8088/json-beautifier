import { useState } from "react";
import jsonlint from "jsonlint-mod"; // Import jsonlint-mod
import { FiClipboard } from "react-icons/fi"; // Import the clipboard icon

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);

  const beautifyJSON = () => {
    try {
      // Try to parse and beautify the JSON
      const parsed = jsonlint.parse(input); // This will throw an error if invalid JSON
      setOutput(JSON.stringify(parsed, null, 2)); // Beautify the JSON if valid
      setError(""); // Clear error if JSON is valid
    } catch (e: any) {
      // Get the error message
      const message = e.message || "Unknown error";
      setError(message); // Set the error message
      setOutput(""); // Clear the output
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard
        .writeText(output)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset the success feedback after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          JSON Beautifier
        </h1>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Paste JSON
        </label>
        <textarea
          className="w-full border rounded-lg p-3 mb-4 font-mono resize-y"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "example"}'
        ></textarea>
        <button
          onClick={beautifyJSON}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Beautify JSON
        </button>

        {output && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Beautified Output</h2>
              <button
                onClick={copyToClipboard}
                className={`text-indigo-600 hover:text-indigo-700 transition ${copySuccess ? "text-green-600" : ""}`}
                title="Copy to Clipboard"
              >
                {copySuccess ? "Copied!" : <FiClipboard size={24} />}
              </button>
            </div>
            <pre className="bg-gray-100 border mt-2 p-4 rounded-lg overflow-auto text-sm font-mono text-gray-800 whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}

        {error && (
          <div className="mt-6">
            <div className="text-red-600 font-semibold">❌ Invalid JSON Error:</div>
            <pre className="bg-red-100 border mt-2 p-4 rounded-lg overflow-auto text-sm font-mono text-red-700 whitespace-pre-wrap">
              {error}
            </pre>
            <div className="mt-4">
              <span className="text-sm">
                💡 Hint: Please ensure all keys are quoted with double quotes, and there are no extra commas or missing values.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;