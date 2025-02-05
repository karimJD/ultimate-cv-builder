"use client";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { generateCV } from "./openAI";
import { PDFViewer } from "@react-pdf/renderer";
import CV from "./CV";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function Home() {
  const [extractedText, setExtractedText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedCV, setGeneratedCV] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);

          const pdf = await pdfjsLib.getDocument({ data }).promise;

          let text = "";
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            textContent.items.forEach((item) => {
              text += item.str + " ";
            });
          }
          setExtractedText(text);
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error parsing PDF:", error);
      }
    } else {
      console.log("Something went wrong");
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    generateCV(extractedText, jobDescription)
      .then((resp) => {
        setGeneratedCV(JSON.parse(resp));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log({ generatedCV });

  return (
    <div className="flex flex-row gap-5 h-screen bg-gray-900 p-10">
      <div className="flex-1 h-full bg-gray-800 rounded-md p-5">
        <h1 className="font-semibold text-lg">Preview the brand new CV</h1>
        {isLoading && (
          <div className="h-full justify-center items-center flex flex-col gap-2">
            <img
              className="w-20 h-20 animate-spin"
              src="https://www.svgrepo.com/show/70469/loading.svg"
              alt="Loading icon"
            />
          </div>
        )}

        {!isLoading && generatedCV && (
          <PDFViewer width="100%" height={"100%"}>
            <CV key="CV" cvData={generatedCV} />
          </PDFViewer>
        )}

        {!generatedCV && isLoading && <placeholder />}
      </div>
      <div className="flex-1 h-full bg-gray-800 flex flex-col justify-between p-5">
        <div className="flex flex-col gap-5">
          <h1 className="font-semibold text-lg">Upload your old trash CV</h1>
          <div className="p-10 text-center border border-dashed border-gray-500 rounded-md hover:border-gray-400 hover:cursor-pointer">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              Upload your old trash CV
            </label>
          </div>

          {extractedText && (
            <div className="mt-5 p-5 bg-gray-700 rounded-md">
              <h2 className="font-semibold mb-2">Extracted Text:</h2>
              <div className="text-sm text-gray-300 line-clamp-5">
                {extractedText}
              </div>
            </div>
          )}

          <h1 className="font-semibold text-lg pt-5">
            Target Job Offer Description
          </h1>
          <textarea
            className="rounded-md bg-gray-700 min-h-32 p-5 font-semibold"
            placeholder="Paste the job description here"
            onChange={(e) => setJobDescription(e.target.value)}
            value={jobDescription}
          />
        </div>
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded max-w-48 self-center"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          Generate CV
        </button>
      </div>
    </div>
  );
}
