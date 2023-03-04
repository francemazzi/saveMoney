import React, { useCallback, useState } from "react";
import type { FileError, FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import FileCard from "~/components/molecols/fileCard";
import CSVReader from "react-csv-reader";
import csv from "csv";
import Papa from "papaparse";
import { csvToArray } from "./functions";
import TableData from "~/components/organisms/table";

export interface uploadFileInterface {
  file: File;
  errors: FileError[];
}
const csvReaderStyles = {
  display: "flex",
  // height: "5 rem",
  // opacity: "0",
  width: "full",
  justify: "center",
  alignItems: "center",
  backgroundColor: "#edf1d6",
  boxShadow: "rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  marginTop: "10px",
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

  const [csvFiles, setCsvFiles] = useState();
  const [files, setFiles] = useState<uploadFileInterface[]>([]);

  // ANY PACKAGE TEST
  const submit = () => {
    try {
      const file = csvFiles;
      const reader = new FileReader();
      console.log(reader);
      reader.onload = function (e) {
        const text = e.target?.result;
        console.log("text", text);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center ">
      <div className="flex w-full flex-col items-center justify-center p-2">
        <h1 className="text-[20px] font-bold">
          Analizza i bilanci e scarica i dati
        </h1>
      </div>

      <div className="flex  flex-col items-center rounded-lg bg-[#EDF1D6] p-2 shadow-md">
        <p className="mt-2">CLICCA QUI PER IMPORTARE IL TUO FILE</p>
        <CSVReader
          cssClass="csv-reader-input"
          parserOptions={{
            header: true,
            skipEmptyLines: true,
          }}
          onFileLoaded={(singleFile) => setFiles(singleFile)}
          inputStyle={csvReaderStyles}
        />
      </div>
      <div className="mt-4">
        {files ? <TableData file={files} list={[]} /> : ""}
      </div>
    </div>
  );
};

export default Balance;
