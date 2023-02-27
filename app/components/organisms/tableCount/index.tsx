import { Import } from "@prisma/client";
import { type } from "os";
import React from "react";

const TITLE_TABLE = ["Nome", "Categoria", "Importo", "Data"];

const confirmCost = false;

interface ImportData {
  name: string;
  value: number;
  entry?: boolean;
  category?: string | null;
  date?: any;
}
interface ImportList {
  list: ImportData[];
}

const Table: React.FC<ImportList> = ({ list }) => {
  return (
    <div className=" grid w-1/2 grid-cols-4 items-start gap-1 rounded-lg bg-[#edf1d6b0] p-2 shadow-md">
      {/* TITLE */}
      {TITLE_TABLE.map((data, index) => {
        return (
          <div
            className="flex flex-col items-center justify-center  p-2"
            key={index}
          >
            <h3>{data}</h3>
            {list.map((dataList, index) => {
              return (
                <div className="m-2 flex flex-col" key={index}>
                  {data == "Nome" ? (
                    <p className="p-2">{dataList.name}</p>
                  ) : data == "Categoria" ? (
                    <p className="p-2 ">{dataList.category}</p>
                  ) : data == "Importo" ? (
                    <p className="p-2 ">
                      {dataList.entry ? "+" : "-"} {dataList.value}
                    </p>
                  ) : (
                    <button className="rounded-md bg-white p-2 shadow-md hover:p-3">
                      Conferma
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;