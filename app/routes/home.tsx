import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import React, { useState } from "react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { category } from "~/commons/type";
import { importValidator } from "~/commons/validation";
import Header from "~/components/molecols/header";
import Navbar from "~/components/molecols/navbar";
import Select from "~/components/molecols/select";
import { createNewImport } from "~/models/import.server";
import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const fieldValues = await importValidator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);

  // const { import, entry, name, category} = fieldValues.data;

  try {
    let entryData;
    fieldValues.data.entry == "true" ? (entryData = true) : (entryData = false);

    const result = await createNewImport({
      name: fieldValues.data.name,
      value: fieldValues.data.import,
      category: fieldValues.data.category,
      entry: entryData,
    });

    console.log(result);

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Homepage = () => {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const [entry, setEntry] = useState(false);

  const path = useLocation();

  return (
    <div>
      <Header email={user.email} pathName={path.pathname} />
      <Navbar />
      {path.pathname == "/home" ? (
        <div className="flex  h-[50vh] w-full flex-col items-center justify-center">
          <h1 className="p-2 text-[30px] font-bold">Aggiungi una spesa</h1>
          <ValidatedForm
            className="flex w-full flex-col items-center"
            validator={importValidator}
            method="post"
          >
            <input
              className="hidden"
              readOnly
              name={"entry"}
              value={entry ? "true" : "false"}
            />
            <input
              name="import"
              type="text"
              placeholder="Insert a value..."
              className="w-1/2 rounded-lg bg-[#EDF1D6] p-4 shadow-md"
            />
            <h2>Inserisci un nome</h2>
            <input
              name="name"
              type="text"
              placeholder="Insert a name..."
              className="w-1/2 rounded-lg bg-[#EDF1D6] p-4 shadow-md"
            />
            <h2>Seleziona la categoria:</h2>
            <div className="w-1/2">
              <Select name={"category"} options={category} />
            </div>
            <h2>Inserisci se è un'entrata o un'uscita</h2>
            <div className="flex w-1/2 flex-row items-center justify-between">
              <button
                type="submit"
                onClick={() => setEntry(true)}
                className="h-[100px] w-[100px] rounded-full  bg-[#EDF1D6] p-2 text-[30px] font-bold text-[green] shadow-md hover:bg-[#b8bf91] focus:outline-none focus:ring focus:ring-[#edf1d665] active:bg-[#b8bf91] "
              >
                +
              </button>
              <button
                // type="submit"
                onClick={() => setEntry(false)}
                className="h-[100px] w-[100px] rounded-full  bg-[#EDF1D6] p-2 text-[30px] font-bold text-[red] shadow-md hover:bg-[#b8bf91] focus:outline-none focus:ring focus:ring-[#edf1d665] active:bg-[#b8bf91] "
              >
                -
              </button>
            </div>
          </ValidatedForm>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Homepage;
