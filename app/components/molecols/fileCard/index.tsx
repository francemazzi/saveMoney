import React, { useEffect } from "react";

type Props = { file: File };

const upLoad = (file: File, onProgress: (percentage: number) => void) => {
  const url = "...";
  return new Promise((result, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = () => {
      result("URL - file saved! 🐶");
    };
    xhr.onerror = (evt) => {
      reject(evt);
    };
    //send percentage of loading data
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    //send form file
    const formData = new FormData();
    formData.append("FILE", file);
    // formData.append("KEY", key);
    xhr.send(formData);
  });
};

function FileCard({ file }: Props) {
  useEffect(() => {
    const upLoadHeavyFile = () => {
      //   const url = await upLoad(file);
    };
    upLoadHeavyFile();
  }, []);
  return <div>FileCard</div>;
}

export default FileCard;
