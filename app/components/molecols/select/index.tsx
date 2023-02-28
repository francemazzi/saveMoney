import React, { useState, useRef } from "react";
import { ValidatedForm } from "remix-validated-form";
import { importValidator } from "~/commons/validation";

//utils
import { useClickOutside } from "~/utils";

export interface Option {
  label: string;
  value: string | number;
}

interface ISelect {
  options?: Array<Option>;
  name: string;
  defaultValue?: string | number;
  readOnly?: boolean;
  onChange?: (e: any) => void;
  custom?: boolean;
}

const Select: React.FC<ISelect> = ({
  options,
  name,
  defaultValue,
  readOnly,
  onChange,
  custom,
}) => {
  const selectRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [fullValue, setFullValue] = useState(
    options?.filter((option) => option.value === value)[0] || {
      label: "",
      value: null,
    }
  );
  const [opened, setOpened] = useState(false);
  const handleClick = (opt?: Option) => {
    if (opt?.value && opt.value !== value) {
      onChange && onChange(opt.value);
      setValue(opt.value);
      setFullValue(opt as Option);
    }
    setOpened(!opened);
  };

  useClickOutside(selectRef, () => setOpened(false));

  return (
    <div
      className={`relative w-full rounded-xl ${
        custom ? "bg-[#40513B]" : "bg-[#EDF1D6]"
      } text-black ${
        opened ? "rounded-b-none shadow-inner shadow-white" : "overflow-hidden"
      }`}
      ref={selectRef}
    >
      <div
        className={`flex items-center justify-between px-4 text-left ${
          custom ? "py-3" : " h-[60px]"
        }`}
        onClick={() => !readOnly && handleClick()}
      >
        <h1
          className={`w-full overflow-hidden text-ellipsis whitespace-nowrap ${
            custom && "text-sm"
          }`}
        >
          {(fullValue as Option).label}
        </h1>
        {!readOnly && (
          <div
            className={`py-1.5 transition-all duration-200 ${
              opened ? "rotate-180" : "rotate-0"
            }`}
          >
            🔽
          </div>
        )}
      </div>
      <div
        className={`transition-height absolute top-[60px] z-10 w-full duration-200 ${
          opened ? "rounded-b-xl bg-[#EDF1D6] shadow-md " : "h-[0px]"
        }`}
      >
        {/* <ValidatedForm
          validator={importValidator}
          method="post"
          className="flex flex-row"
        > */}
        <input
          type="text"
          name="categoryInput"
          placeholder="Inserisci una categoria nuova"
          className="w-full"
          id=""
        />

        {/* </ValidatedForm> */}
        {options?.map((option, i) => (
          <div
            key={i}
            onClick={() => handleClick(option)}
            className={`h-full bg-[#EDF1D6] px-4 py-2 transition-all duration-200 hover:bg-[#609966] ${
              i + 1 === options.length ? "rounded-b-xl" : ""
            }`}
          >
            <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {option.label}
            </h1>
          </div>
        ))}
      </div>
      <select className="hidden" value={value} name={name}>
        {options?.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
