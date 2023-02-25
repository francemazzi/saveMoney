import { Form, Link } from "@remix-run/react";
import React from "react";

interface NavbarInterface {
  email: string;
  pathName: string;
}

const Navbar: React.FC<NavbarInterface> = ({ email, pathName }) => {
  return (
    <header className="flex items-center justify-between bg-[#EDF1D6] p-4 text-[#40513B] shadow-md">
      <h1 className="text-3xl font-bold">
        <Link to=".">Save money</Link>
      </h1>
      <p>{pathName.slice(1)}</p>
      {/* <p>{email}</p> */}
      <Form action="/logout" method="post">
        <button
          type="submit"
          className=" rounded-lg bg-[#9DC08B] py-2 px-4 font-bold text-[#40513B] hover:bg-[#609966] active:bg-[#6099669d]"
        >
          Logout
        </button>
      </Form>
    </header>
  );
};

export default Navbar;
