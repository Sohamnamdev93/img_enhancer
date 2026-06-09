import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const processImage = async (type) => {

    if (!file) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {

      const response = await axios.post(
        `http://127.0.0.1:8000/${type}`,
        formData,
        {
          responseType: "blob"
        }
      );

      const imageUrl = URL.createObjectURL(
        response.data
      );

      setResult(imageUrl);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold">
            SOHAM's AI ENHANCER
          </h1>

          <p className="text-slate-400 mt-2">
            Enhance • Aesthetic • HD Export
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Upload */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

            <label
              htmlFor="upload"
              className="h-72 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-center">
                <div className="text-5xl">📸</div>
                <p className="mt-3">Upload Image</p>
              </div>
            </label>

            <input
              id="upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                const img = e.target.files[0];
                setFile(img);
                setPreview(URL.createObjectURL(img));
              }}
            />
          </div>

          {/* Preview */}
          <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              BEFORE / AFTER
            </h2>

            <div className="flex gap-4">

              <div>
                <h3 className="mb-2 text-slate-400">
                  Original
                </h3>

                {preview && (
                  <img
                    src={preview}
                    className="rounded-xl"
                    width="100%"
                    height="500px"
                  />
                )}
              </div>

              <div>
                <h3 className="mb-2 text-slate-400">
                  Result
                </h3>

                {result && (
                  <img
                    src={result}
                    className="rounded-xl"
                    width="100%"
                    height="500px"
                  />
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() => processImage("enhance")}
            className="bg-indigo-500 px-6 py-3 rounded-xl"
          >
            ✨ Enhance
          </button>

          <button
            onClick={() => processImage("aesthetic")}
            className="bg-slate-700 px-6 py-3 rounded-xl"
          >
            🎨 Aesthetic
          </button>

        </div>

        {/* Download */}
        <div className="mt-8">

          <a
            href={result}
            download="enhanced-image.jpg"
          >
            <button>
              Download
            </button>
          </a>

        </div>

      </div>
    </div>
  );
}

export default App;