import { Import } from "@prisma/client";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { p } from "vitest/dist/index-2dd51af4";

const TITLE_TABLE = ["Nome", "Categoria", "Importo", "Data"];

const confirmCost = false;

interface ImportData {
  name: string;
  value: number;
  entry?: boolean;
  category?: string | null;
  date?: any;
  file?: any;
}
interface ImportList {
  list: ImportData[];
  file?: any;
}

const TableData: React.FC<ImportList> = ({ list, file }) => {
  const [TitleOfKey, setTitleOfKey] = useState([]);
  console.log("file", file);
  console.log("TitleOfKey", TitleOfKey);

  useEffect(() => {
    const colTitle = file.reduce((acc: any, obj: any) => {
      Object.keys(obj).forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    }, []);
    console.log("colTitle", colTitle);
    setTitleOfKey(colTitle);
  }, [file]);

  return (
    <div className="  grid max-h-40 grid-cols-4 items-start  overflow-x-scroll rounded-lg bg-[#edf1d6b0] p-2 shadow-md">
      {/* TITLE */}
      {/* {TitleOfKey.map((data, index) => {
        return (
          <div
            className="flex flex-col items-center justify-center "
            key={index}
          >
            <h3 className="z-1 sticky top-0 w-full bg-[#ffffffb1] text-center text-[18px] font-bold">
              {data}
            </h3>
            {file.map((dataList, index) => {
              for (let i = 0; i <= TitleOfKey.length; i++) {
                if (data == TitleOfKey[i]) {
                  //   console.log(dataList?.TitleOfKey[i]);
                  //   return (
                  //     <p>
                  //       {dataList?.TitleOfKey[i] ? dataList?.TitleOfKey[i] : ""}
                  //     </p>
                  //   );
                }
              }
              //   return (
              //     <div className="m-2 flex flex-col" key={index}>

              //     </div>
              //   );
            })}
          </div>
        );
      })} */}
    </div>
  );
};

export default TableData;
