"use client";
import { useEffect, useState } from "react";
import SelectInput from "../common/SelectInput";
import { addTeam } from "@/utils/functions/addTeam";
import { Toaster, toast } from "sonner";

const TeamAddModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [inputs, setInputs] = useState({
    name: "",
    cell: "",
    role: "",
    github: "",
    linkedin: "",
    instagram: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      await addTeam(
        inputs.name,
        inputs.role,
        inputs.github,
        inputs.linkedin,
        inputs.instagram,
        inputs.image,
        inputs.cell
      );
      toast.success("Member Added");
      onClose();
      
    } catch (e) {
      toast.error("Error Adding Member");
    }
  };
  const teamCategories = [
    "Core",
    "Tech",
    "Creative",
    "Sponsorship & Marketing",
    "Social Media",
  ];
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#01071c] text-[#1a8fdd] border-y border-[#1a8fdd] p-4 rounded-lg ">
            <h2 className="text-lg font-semibold mb-2">Add Coordinator</h2>
            <Toaster richColors position="bottom-right" />
            <div className="flex flex-col gap-4">
              <SelectInput
                id="cell"
                name="Cell"
                onChange={handleInputChange}
                value={inputs.cell}
                options={teamCategories}
              />
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInputChange}
                placeholder="Name"
                className=" px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <input
                type="text"
                value={inputs.role}
                name="role"
                onChange={handleInputChange}
                placeholder="Role"
                className=" px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <input
                type="text"
                value={inputs.image}
                name="image"
                onChange={handleInputChange}
                placeholder="Image URL"
                className=" px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <input
                type="text"
                value={inputs.github}
                name="github"
                onChange={handleInputChange}
                placeholder="GitHub"
                className=" px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <input
                type="text"
                value={inputs.linkedin}
                name="linkedin"
                onChange={handleInputChange}
                placeholder="LinkedIn"
                className=" px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <input
                type="text"
                value={inputs.instagram}
                name="instagram"
                onChange={handleInputChange}
                placeholder="Instagram"
                className=" px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-transparent text-red-500 border border-red-500 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-transparent text-[#1a8fdd] border border-[#1a8fdd]  px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamAddModal;
