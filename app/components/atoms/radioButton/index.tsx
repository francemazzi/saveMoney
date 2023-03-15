import React, { useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { adminValidator } from "~/commons/validation";

type Props = {
  idNum: string;
  admin: boolean;
  email: string;
};

function RadioButton({ idNum, admin, email }: Props) {
  const [adminRadio, setAdminRadio] = useState(admin);

  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let button = e.target as HTMLButtonElement;

    if (button.id == "admin") {
      setAdminRadio(true);
    } else {
      setAdminRadio(false);
    }
  };

  return (
    <div
      // validator={adminValidator}
      // method="post"
      className="flex flex-row items-center justify-center"
    >
      {/* hidden input to send value to action */}
      <input name="id" type="text" value={idNum} className="hidden" readOnly />
      <input
        name="admin"
        type="text"
        value={adminRadio ? "true" : "false"}
        className="hidden"
        readOnly
      />
      <p className="m-2 p-2 text-[black]">{email}</p>
      <button className="rounded-md p-2 shadow-md">Elimina</button>
      <button
        id="admin"
        className={`mx-3 h-[30px] w-[30px] rounded-full ${
          adminRadio ? "bg-[#EDF1D6]" : ""
        } shadow-md`}
        onClick={onClickButton}
      >
        A
      </button>

      <button
        id="user"
        className={`mx-3 h-[30px] w-[30px] rounded-full ${
          adminRadio ? "" : "bg-[#EDF1D6]"
        } shadow-md`}
        onClick={onClickButton}
      >
        U
      </button>
    </div>
  );
}

export default RadioButton;
