import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { adminValidator, settingsValidator } from "~/commons/validation";
import RadioButton from "~/components/atoms/radioButton";
import {
  getUserById,
  getUsers,
  updateUserData,
  User,
} from "~/models/user.server";
import { requireUserId } from "~/session.server";

// type UserDataType = {
//   id: string;
//   isAdmin: boolean;
// };
interface newUserInterface {
  id: string;
  email: string;
  nome: string;
  cognome: string;
  isAdmin: boolean | any;
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);
  const users = await getUsers();

  return json({ user, users, userId });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const validator = formData.get("action")?.toString();

  let fieldValues;

  switch (validator) {
    case "fieldValuesAdmin":
      fieldValues = await adminValidator.validate(formData);
      break;
    default:
      fieldValues = await settingsValidator.validate(formData);
      break;
  }

  //error managment
  if (fieldValues.error) return validationError(fieldValues.error);

  const { id, admin, userId, nome, cognome } = fieldValues.submittedData;

  if (validator == "fieldValuesAdmin") {
    await updateUserData({
      id: id,
      field: "admin",
      value:
        id === userId
          ? admin === "true"
            ? true
            : true
          : admin === "true"
          ? true
          : false,
    });
  }

  if (validator == "fieldValuesSettings") {
    try {
      await updateUserData({
        id: userId,
        field: "nome",
        value: nome,
      });
      await updateUserData({
        id: userId,
        field: "cognome",
        value: cognome,
      });
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  return null;
}

const Settings = () => {
  const { user, users, userId } = useLoaderData<typeof loader>();
  const [adminRadio, setAdminRadio] = useState(false);
  const [obj, setObj] = useState<newUserInterface>({
    id: "",
    email: "",
    nome: "",
    cognome: "",
    isAdmin: false,
  });

  const newUser: Array<newUserInterface> = [];

  users.map((data) => {
    newUser.push({
      id: data.id,
      nome: data.nome ? data.nome : "",
      cognome: data.nome ? data.nome : "",
      email: data.email,
      isAdmin: data.admin === true ? data.admin : false,
    });
    return data;
  });

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="p-2  text-[30px] font-bold">Le tue impostazioni</h1>

      <ValidatedForm
        className="flex w-full flex-col items-center"
        validator={settingsValidator}
        method="post"
      >
        <p>Il tuo nome:</p>

        <input
          className="hidden"
          name="action"
          defaultValue="fieldValuesSettings"
        />
        <input
          name="userId"
          type="text"
          value={userId}
          className="hidden"
          readOnly
        />
        <input
          name={"nome"}
          type="text"
          placeholder={user?.nome ? user?.nome : "Insert a value..."}
          className="w-1/2 rounded-lg bg-[#EDF1D6] p-4 shadow-md"
        />
        <p>Cognome</p>
        <input
          name="cognome"
          type="text"
          placeholder={user?.cognome ? user?.cognome : "Insert a value..."}
          className="w-1/2  rounded-lg bg-[#EDF1D6] p-4 shadow-md"
        />
        <button type="submit" className="rounded-lg p-4 shadow-lg">
          Salva
        </button>
      </ValidatedForm>

      {user?.admin && (
        <div className="flex flex-col justify-center">
          <h3 className="p-2 text-[22px] font-bold">
            Ecco una lista degli utenti iscritti
          </h3>
          {newUser.map((data) => {
            return (
              <ValidatedForm
                key={data.id}
                validator={adminValidator}
                method="post"
              >
                <input
                  className="hidden"
                  name="action"
                  defaultValue="fieldValuesAdmin"
                />
                <input
                  name="userId"
                  type="text"
                  value={user.id}
                  className="hidden"
                  readOnly
                />
                <RadioButton
                  key={data.id}
                  idNum={data.id}
                  admin={data.isAdmin}
                  email={data.email}
                />
              </ValidatedForm>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Settings;
