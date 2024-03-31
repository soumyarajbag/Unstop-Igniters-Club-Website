import React from "react";

const SelectInput = ({
  options,
  onChange,
  id,
  name,
  value,
  width,
}: {
  options: any;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
}) => {
  return (
    <div className="flex flex-row  items-center text-[#1a8fdd] justify-center gap-2 relative">
      <label htmlFor="event" className="font-semibold text-sm md:text-xl ">
        {name} :
      </label>
      <select
        name={id}
        id={id}
        className={`py-1 bg-transparent px-4 w-[${
          width != undefined ? width : "100%"
        }] rounded-xl border border-[#1a8fdd] w-full text-[#1a8fdd] font-semibold`}
        onChange={onChange}
      >
        <option id={id} value=""></option>
        {options.map((option: any, index: number) => {
          return (
            <option className="bg-transparent" key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
