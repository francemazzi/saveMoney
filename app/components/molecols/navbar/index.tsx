import { Link } from "@remix-run/react";
import React from "react";

const Navdata = [
  {
    name: "Bilancio",
    to: "balance",
  },
  {
    name: "Movimenti",
    to: "category",
  },
  {
    name: "Analisi",
    to: "list",
  },
  {
    name: "Settings",
    to: "settings",
  },
];

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center ">
        {Navdata.map((data, index) => {
          return (
            <Link
              to={data.to}
              key={index}
              className="m-2 rounded-lg p-2 font-bold shadow-md hover:bg-[#EDF1D6]"
            >
              {data.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
