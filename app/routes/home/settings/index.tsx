import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import {
  GenericObject,
  ValidatedForm,
  ValidateFieldResult,
  validationError,
  ValidationResult,
} from "remix-validated-form";
import { adminValidator, settingsValidator } from "~/commons/validation";
import RadioButton from "~/components/atoms/radioButton";
import { getUserById, getUsers } from "~/models/user.server";
import { requireUserId } from "~/session.server";

//Create action upate user -> add name add surname, if user is admin set other admin user
//Creare funzione in action che se mail è francemazzi@gmail.com allora admin è true

//TODO: creare action che prende in input dati da radio button, ricorda che admin devi trasformarlo da string a boolean
//RICORDA  che la funzione onClickButtonAdmin prende il valore dello specifico bottone

type UserDataType = {
  id: string;
  isAdmin: boolean;
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);
  const users = await getUsers();

  return json({ user, users });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const fieldValuesSettings = await settingsValidator.validate(formData);
  const fieldValuesAdmin = await adminValidator.validate(formData);
  //error managment
  if (fieldValuesSettings.error)
    return validationError(fieldValuesSettings.error);
  if (fieldValuesAdmin.error) return validationError(fieldValuesAdmin.error);

  console.log(
    "fieldValuesSettings",
    fieldValuesSettings,
    "fieldValuesAdmin",
    fieldValuesAdmin
  );
}

const Settings = () => {
  const { user, users } = useLoaderData<typeof loader>();

  const [adminRadio, setAdminRadio] = useState(false);

  const onClickButtonAdmin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let button = e.target as HTMLButtonElement;

    console.log(typeof button.id, button.id);
    console.log(`admin-${user?.id}`);

    if (button.id === `admin-${user?.id}`) {
      setAdminRadio(true);
      console.log("admin", adminRadio, user?.id);
    } else if (button.id === `user-${user?.id}`) {
      setAdminRadio(false);
      console.log(adminRadio);
      console.log("user", adminRadio, user?.id);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="p-2  text-[30px] font-bold">Le tue impostazioni</h1>
      <ValidatedForm
        className="flex w-full flex-col items-center"
        validator={settingsValidator}
      >
        <p>Il tuo nome:</p>
        <input
          name="import"
          type="text"
          placeholder="Insert a value..."
          className="w-1/2 rounded-lg bg-[#EDF1D6] p-4 shadow-md"
        />
        <p>Cognome</p>
        <input
          name="import"
          type="text"
          // defaultValue={user}
          placeholder="Insert a value..."
          className="w-1/2  rounded-lg bg-[#EDF1D6] p-4 shadow-md"
        />
      </ValidatedForm>

      <div className="flex flex-col justify-center">
        <h3 className="p-2 text-[22px] font-bold">
          Ecco una lista degli utenti iscritti
        </h3>
        {users.map((data, index) => {
          return (
            <ValidatedForm
              validator={adminValidator}
              className="flex flex-row items-center justify-center"
              key={index}
            >
              <input
                name="id"
                type="text"
                value={user?.id}
                className="hidden"
                readOnly
              />
              <input
                name="admin"
                type="text"
                value={adminRadio ? "true" : "false"}
                className="hidden"
                readOnly
              />
              <p className="m-2 p-2 text-[black]">{data.email}</p>
              <button className="rounded-md p-2 shadow-md">Elimina</button>
              <div className="flex flex-row items-center justify-center">
                <button
                  id={`admin-${data?.id}`}
                  className={`mx-3 h-[30px] w-[30px] rounded-full ${
                    data.admin ? "bg-[#EDF1D6]" : ""
                  } shadow-md`}
                  onClick={onClickButtonAdmin}
                >
                  A
                </button>
                <button
                  id={`user-${data?.id}`}
                  className={`mx-3 h-[30px] w-[30px] rounded-full ${
                    data.admin ? "" : "bg-[#EDF1D6]"
                  } shadow-md`}
                  onClick={onClickButtonAdmin}
                >
                  U
                </button>
              </div>
            </ValidatedForm>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
