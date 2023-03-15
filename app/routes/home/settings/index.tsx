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
import { getUserById, getUsers, updateUserData } from "~/models/user.server";
import { requireUserId } from "~/session.server";

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

  const { id, admin, userId } = fieldValues.submittedData;

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

  return null;
}

const Settings = () => {
  const { user, users } = useLoaderData<typeof loader>();
  console.log(user);
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

  // const onClickButtonAdmin = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   let button = e.target as HTMLButtonElement;

  //   users.map((data) => {
  //     if (button.id === `admin-${data?.id}`) {
  //       setAdminRadio(data.admin ? data.admin : true);
  //     } else if (button.id === `user-${data?.id}`) {
  //       setAdminRadio(false);
  //     }
  //     const objectIdToFind = button.id.split("-")[1];
  //     const foundObject = newUser.find(
  //       (obj: newUserInterface) => obj.id === objectIdToFind
  //     );

  //     if (foundObject !== undefined) {
  //       foundObject.isAdmin = adminRadio;
  //       setObj(foundObject);
  //     } else {
  //       console.log("FOUND OBJ undefined");
  //     }
  //     return data;
  //   });
  // };

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
        <button className="rounded-lg p-4 shadow-lg">Salva</button>
      </ValidatedForm>

      {user?.admin && (
        <div className="flex flex-col justify-center">
          <h3 className="p-2 text-[22px] font-bold">
            Ecco una lista degli utenti iscritti
          </h3>
          {/* useFetcher() */}
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
