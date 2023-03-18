import { Import } from "@prisma/client";
import { type } from "os";
import React, { useEffect, useState } from "react";

interface ImportData {
  name: string;
  value: number;
  entry?: boolean;
  category?: string | null;
  date?: any;
  file?: any;
}
//ImportList.file?: CsvData[] | undefined
export interface CsvData {
  [key: string]: string;
}
export interface ImportList {
  list?: ImportData[];
  file?: CsvData[];
}

function formatCellValue(value: any): string {
  if (typeof value === "string" && value.length > 10) {
    return `${value.slice(0, 5)}...${value.slice(-5)}`;
  } else {
    return value.toString();
  }
}

const TableData: React.FC<ImportList> = ({ list, file }) => {
  const [TitleOfKey, setTitleOfKey] = useState([]);

  useEffect(() => {
    const colTitle = file?.reduce((acc: any, obj: any) => {
      Object.keys(obj).forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    }, []);
    setTitleOfKey(colTitle);
  }, [file]);

  return (
    <div className="m-2">
      {/* TITLE */}
      <table className="h-full w-full table-fixed overflow-x-auto whitespace-nowrap rounded-lg bg-[#edf1d6b0]">
        <thead>
          <tr>
            {TitleOfKey.map((data, index) => {
              return (
                <th key={index} className="p-2 text-[12px] text-[black] ">
                  <p className="whitespace-nowrap">{data}</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {file?.map((data, index) => {
            return (
              <tr
                key={index}
                className="m-2 h-[25px] border-t border-slate-300 transition-all duration-75 "
              >
                {Object.keys(data).map((key) => (
                  <td className="text-center" key={key}>
                    {data[key].length > 10
                      ? formatCellValue(data[key])
                      : data[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
