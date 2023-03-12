import React, { useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { adminValidator } from "~/commons/validation";

type Props = {
  idNum: string;
  admin: boolean;
  onClickButton: (e: any) => {};
};

interface UserDataInterface {
  id: string;
  isAdmin?: boolean;
}

function RadioButton({ idNum, admin, onClickButton }: Props) {
  const [adminRadio, setAdminRadio] = useState(admin);

  // const userData: UserDataInterface = {
  //   id: idNum,
  // };

  // const onClickButton = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   let button = e.target as HTMLButtonElement;

  //   if (button.id == "admin") {
  //     setAdminRadio(true);
  //   } else {
  //     setAdminRadio(false);
  //   }
  // };

  return (
    <div className="flex flex-row items-center justify-center">
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
