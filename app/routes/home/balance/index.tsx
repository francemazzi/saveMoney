import React, { useCallback, useState } from "react";
import type { FileError, FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import FileCard from "~/components/molecols/fileCard";
import CSVReader from "react-csv-reader";
import csv from "csv";
import Papa from "papaparse";
import { csvToArray } from "./functions";

interface uploadFileInterface {
  file: File;
  errors: FileError[];
}
const csvReaderStyles = {
  display: "flex",
  justify: "center",
  alignItems: "center",
  borderRadius: "0.5rem",
  backgroundColor: "#edf1d6",
  padding: "2rem",
  boxShadow: "rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  marginTop: "50px",
};

const Balance = () => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mapAccesFile = acceptedFiles.map((file) => {
        return { file, errors: [] };
      });
      setFiles((currentFile) => [
        ...currentFile,
        ...mapAccesFile,
        ...rejectedFiles,
      ]);
    },
    []
  );

  const [files, setFiles] = useState<uploadFileInterface[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex w-full flex-col items-center ">
      <div className="flex w-full flex-col items-center justify-center p-2">
        <h1 className="text-[20px] font-bold">
          Analizza i bilanci e scarica i dati
        </h1>
      </div>
      <div
        className="flex h-[100px] items-center rounded-lg bg-[#EDF1D6] p-2 shadow-md"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <CSVReader
        cssClass="csv-reader-input"
        parserOptions={{
          header: true,
          skipEmptyLines: true,
        }}
        onFileLoaded={(singleFile) => console.log("singleFile", singleFile)}
        inputStyle={csvReaderStyles}
      />
    </div>
  );
};

export default Balance;
