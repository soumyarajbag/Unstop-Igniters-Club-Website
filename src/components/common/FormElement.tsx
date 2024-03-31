import React from "react";

const FormElement = ({
  name,
  value,
  type,
  id,
  onChange,
  width,
  disabled,
}: {
  name: string;
  value: string;
  type: string;
  id: string;
  width?: string;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <div className="flex flex-row text-[#1a8fdd]  items-center gap-1 md:gap-5 flex-wrap justify-start">
      <label htmlFor={id} className="font-semibold text-base md:text-lg">
        {name} :
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        name={id}
        disabled={disabled}
        id={id}
        className={`w-[${width}] border-[#1a8fdd] border text-white px-2 py-1 max-md:w-full rounded-xl bg-transparent`}
      />
    </div>
  );
};
export default FormElement;