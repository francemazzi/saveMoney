import React from "react";

const TITLE_TABLE = ["Nome", "Categoria", "Data", "Importo"];
const DATA = ["1", "2", "3", "4"];

const Table = () => {
  return (
    <div className=" grid w-1/2 grid-cols-4 items-start gap-1 bg-red-50 p-2">
      {/* TITLE */}
      {TITLE_TABLE.map((data, index) => {
        return (
          <div className="flex items-center justify-center  p-2" key={index}>
            <h3>{data}</h3>
          </div>
        );
      })}
      {DATA.map((data, index) => {
        return (
          <div className="flex items-center justify-center  p-2" key={index}>
            <p>{data}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
