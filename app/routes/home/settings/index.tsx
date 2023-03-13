import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
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
interface newUserInterface {
  id: string;
  email: string;
  isAdmin: boolean | any;
}

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

  console.log("fieldValuesAdmin", request);

  // try {
  //   console.log("fieldValuesAdmin", formData);
  //   return null;
  // } catch (e) {
  //   console.log(e);
  // }

  return null;
}

const Settings = () => {
  const { user, users } = useLoaderData<typeof loader>();

  const [adminRadio, setAdminRadio] = useState(false);
  const [obj, setObj] = useState<newUserInterface>({
    id: "",
    email: "",
    isAdmin: false,
  });

  const newUser: Array<newUserInterface> = [];

  users.map((data) => {
    newUser.push({
      id: data.id,
      email: data.email,
      isAdmin: data.admin === true ? data.admin : false,
    });
    return data;
  });

  //ricerca oggetto id oggeto in array

  // useEffect(() => {
  //   console.log(newUser);
  // }, [newUser]);

  const onClickButtonAdmin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let button = e.target as HTMLButtonElement;

    users.map((data) => {
      if (button.id === `admin-${data?.id}`) {
        setAdminRadio(data.admin ? data.admin : true);
      } else if (button.id === `user-${data?.id}`) {
        setAdminRadio(false);
      }
      const objectIdToFind = button.id.split("-")[1];
      const foundObject = newUser.find(
        (obj: newUserInterface) => obj.id === objectIdToFind
      );

      if (foundObject !== undefined) {
        foundObject.isAdmin = adminRadio;
        setObj(foundObject);
      } else {
        console.log("FOUND OBJ undefined");
      }
      return data;
    });
  };

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

      {user?.admin && (
        <div className="flex flex-col justify-center">
          <h3 className="p-2 text-[22px] font-bold">
            Ecco una lista degli utenti iscritti
          </h3>

          <ValidatedForm validator={adminValidator} method="post">
            {/* hidden input to send value to action */}
            <input
              name="id"
              type="text"
              defaultValue={obj?.id}
              // className="hidden"
              readOnly
            />
            <input
              name="admin"
              type="text"
              defaultValue={obj.isAdmin ? "true" : "false"}
              // className="hidden"
              readOnly
            />
            {newUser.map((data, index) => {
              return (
                <div
                  // validator={adminValidator}
                  // method="post"
                  className="flex flex-row items-center justify-center"
                  key={index}
                >
                  <p className="m-2 p-2 text-[black]">{data.email}</p>
                  <button className="rounded-md p-2 shadow-md">Elimina</button>
                  <div className="flex flex-row items-center justify-center">
                    <button
                      type="submit"
                      id={`admin-${data?.id}`}
                      className={`mx-3 h-[30px] w-[30px] rounded-full ${
                        data.isAdmin ? "bg-[#EDF1D6]" : "bg-[#FFFF]"
                      } shadow-md`}
                      onClick={onClickButtonAdmin}
                    >
                      A
                    </button>
                    <button
                      type="submit"
                      id={`user-${data?.id}`}
                      className={`mx-3 h-[30px] w-[30px] rounded-full ${
                        data.isAdmin ? "bg-[#FFFF]" : "bg-[#EDF1D6]"
                      } shadow-md`}
                      onClick={onClickButtonAdmin}
                    >
                      U
                    </button>
                  </div>
                </div>
              );
            })}
          </ValidatedForm>
        </div>
      )}
    </div>
  );
};

export default Settings;
