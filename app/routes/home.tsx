import { Import } from "@prisma/client";
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
import React, { useRef, useState } from "react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { category } from "~/commons/type";
import { importValidator } from "~/commons/validation";
import Header from "~/components/molecols/header";
import Navbar from "~/components/molecols/navbar";
import Select from "~/components/molecols/select";
import Table from "~/components/organisms/tableCount";
import {
  assignImportToUser,
  createNewImport,
  getImports,
} from "~/models/import.server";
import { getNoteListItems } from "~/models/note.server";
import { getImportsFromUsers } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

// type LoaderData = {
//   imports: Awaited<ReturnType<typeof getImportsFromUsers>>;
// };

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const importListItems = await getImports();

  const listUserImport = await getImportsFromUsers(userId);
  console.log(listUserImport);

  return json({ importListItems, userId, listUserImport });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const fieldValues = await importValidator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);

  try {
    let entryData;
    fieldValues.data.entry == "true" ? (entryData = true) : (entryData = false);

    const result = await createNewImport({
      name: fieldValues.data.name,
      value: fieldValues.data.import,
      category: fieldValues.data.categoryInput
        ? fieldValues.data.categoryInput
        : fieldValues.data.category,
      entry: entryData,
    });
    //assign import to user
    if (result) {
      await assignImportToUser({
        userId: fieldValues.data.userId,
        importId: result.id,
      });
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Homepage = () => {
  const { importListItems, userId, listUserImport } =
    useLoaderData<typeof loader>();

  type Category = {
    label: string;
    value: string;
  };
  const [costConfirm, setCostConfirm] = useState(false);
  let categories: Category[] = [];

  importListItems.map((data: any) => {
    if (!categories.some((category) => category.value === data.category)) {
      categories.push({ label: data.category, value: data.category });
    }
    return categories;
  });

  const user = useUser();

  const [entry, setEntry] = useState(false);

  // const [name, setName] = useState("");
  // const [importo, setImporto] = useState("");
  // const [categoryData, setCategory] = useState("");

  // function handleSubmit(event: any) {
  //   setName("");
  //   setImporto("");
  //   setCategory("");
  // }

  const path = useLocation();

  return (
    <div>
      <Header email={user.email} pathName={path.pathname} />
      <Navbar />
      {path.pathname == "/home" ? (
        <div className="flex  w-full flex-col items-center justify-center">
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
            <input className="hidden" readOnly name={"userId"} value={userId} />
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
              <Select name={"category"} options={categories} />
            </div>
            <h2>Inserisci se è un'entrata o un'uscita</h2>
            <div className="flex w-1/2 flex-row items-center justify-between">
              <button
                type="submit"
                onClick={() => setEntry(true)}
                className="flex h-[50px] w-[50px] flex-col items-center justify-center rounded-full bg-[#EDF1D6] p-2 text-center text-[30px] font-bold text-[green] shadow-md hover:bg-[#b8bf91] focus:outline-none focus:ring focus:ring-[#edf1d665] active:bg-[#b8bf91] lg:h-[100px] lg:w-[100px]"
              >
                +
              </button>
              <button
                type="submit"
                onClick={() => setEntry(false)}
                className="flex  h-[50px] w-[50px] flex-col items-center justify-center rounded-full  bg-[#EDF1D6] p-2 text-center text-[30px] font-bold text-[red] shadow-md hover:bg-[#b8bf91] focus:outline-none focus:ring focus:ring-[#edf1d665] active:bg-[#b8bf91] lg:h-[100px] lg:w-[100px]"
              >
                -
              </button>
            </div>
          </ValidatedForm>
          <div className="mt-[50px] flex w-full flex-col items-center">
            <Table
              list={listUserImport}
              onClick={() => {
                setCostConfirm(true);
              }}
            />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Homepage;
