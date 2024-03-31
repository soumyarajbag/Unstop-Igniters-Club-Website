"use client";
import CoordinatorForm from "@/components/admin/CoordinatorForm";
import LinkForm from "@/components/admin/LinkForm";
import FormElement from "@/components/common/FormElement";
import Heading from "@/components/common/Heading";
import { addEvent } from "@/utils/functions/addEvent";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  TbSquareRoundedMinusFilled,
  TbSquareRoundedPlusFilled,
} from "react-icons/tb";
import "react-quill/dist/quill.snow.css";

export interface ICoordinator {
  name: string;
  email: string;
}
export interface ILink {
  title: string;
  url: string;
}
const page = () => {
  const router = useRouter();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [isCoordinatorFormOpen, setIsCoordinatorFormOpen] = useState(false);
  const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    minTeamSize: 0,
    maxTeamSize: 0,
    participantsCount: 0,
   schedule: "",
    description: "",
    rules: "",
    imagePath: "",
    links: [],
    venue: "",
    coordinators: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddCoordinator = (coordinator: ICoordinator) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      coordinators: [...prevInputs.coordinators, coordinator],
    }));
  };
  const handleRemoveCoordinator = (index: number) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      coordinators: prevInputs.coordinators.filter(
        (_: any, idx: number) => idx !== index
      ),
    }));
  };
  const handleAddLink = (link: ILink) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      links: [...prevInputs.links, link],
    }));
  };
  const handleRemoveLink = (index: number) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      links: prevInputs.links.filter((_: any, idx: number) => idx !== index),
    }));
  };
  const handleQuillChange = (value: string, name: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-[90%] md:w-[80%] mx-auto overflow-x-hidden">
      <Heading text="Add Event" />
      <div className=" mx-auto border-2 border-[#1a8fdd] rounded-xl bg-transparent flex flex-col  flex-wrap gap-10 w-full px-5 py-5  md:px-10 md:py-10">
        <div className=" flex flex-row items-center gap-8 md:gap-8 flex-wrap justify-start w-full  ">
          <FormElement
            name="Event Name"
            value={inputs.name}
            id="name"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Schedule"
            value={inputs.schedule}
            id="schedule"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />

          <FormElement
            name="Min Team Size"
            value={inputs.minTeamSize.toString()}
            id="minTeamSize"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
          <FormElement
            name="Max Team Size"
            value={inputs.maxTeamSize.toString()}
            id="maxTeamSize"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
           <FormElement
            name="Participation Count"
            value={inputs.participantsCount.toString()}
            id="participantsCount"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
          <FormElement
            name="Venue"
            value={inputs.venue}
            id="venue"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Image Path"
            value={inputs.imagePath}
            id="imagePath"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
        </div>
        <div className="flex flex-col items-start gap-2 text-[#1a8fdd]">
          <label
            htmlFor={"links"}
            className="font-semibold flex flex-row items-center gap-2  text-base md:text-lg"
          >
            Links :
            {inputs.links.length == 0 && (
              <div className="font-semibold">
                <TbSquareRoundedPlusFilled
                  onClick={() => setIsLinkFormOpen(true)}
                  className="font-semibold cursor-pointer rounded-full"
                  size={30}
                />
              </div>
            )}
          </label>
          <div className="flex flex-col items-start">
            {inputs.links.length > 0 &&
              inputs.links.map((link: ILink, index: number) => {
                return (
                  <LinkChip
                    name={link.title}
                    link={link.url}
                    index={index}
                    handleAddLink={handleAddLink}
                    handleRemoveLink={handleRemoveLink}
                    isLinkFormOpen={isLinkFormOpen}
                    setIsLinkFormOpen={setIsLinkFormOpen}
                  />
                );
              })}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row max-md:flex-wrap items-center gap-5">
          <div className="w-full lg:w-1/2 flex flex-col gap-5 text-[#1a8fdd]">
            <div className="flex flex-col items-start gap-1 w-full md:gap-5 flex-wrap justify-start">
              <label
                htmlFor={"description"}
                className="font-semibold md:text-xl"
              >
                Description :
              </label>
              <ReactQuill
                theme="snow"
                value={inputs.description}
                className="w-full   text-[#1a8fdd]"
                onChange={(value) => handleQuillChange(value, "description")}
              />
            </div>

            <div className="flex flex-col items-start gap-1 w-full md:gap-5 flex-wrap justify-start">
              <label
                htmlFor={"description"}
                className="font-semibold md:text-xl"
              >
                Rules :
              </label>
              <ReactQuill
                theme="snow"
                value={inputs.rules}
                className="w-full border-2 border-black"
                onChange={(value) => handleQuillChange(value, "rules")}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-[#1a8fdd] text-center flex flex-col gap-3">
            {inputs.coordinators.length == 0 ? (
              <h1>No Coordinators Added yet !</h1>
            ) : (
              <div>
                <h2 className="font-semibold text-xl ">Coordinators</h2>
                <ul className="flex flex-col items-center gap-2">
                  {inputs.coordinators.map(
                    (coordinator: ICoordinator, index: number) => (
                      <li
                        key={index}
                        className="border-2 border-[#1a8fdd] rounded-xl px-2 py-1"
                      >
                        <p className=" font-semibold text-lg">
                          {index + 1}. {coordinator.name}
                        </p>
                        <p className=" font-semibold text-lg">
                          {coordinator.email}
                        </p>
                        <button
                          onClick={() => handleRemoveCoordinator(index)}
                          className="text-red-500 border-red-500 border-2 mt-3 rounded-full px-2  font-semibold"
                        >
                          Remove
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            <button
              onClick={() => setIsCoordinatorFormOpen(true)}
              className="font-semibold md:w-1/2 mx-auto text-sm md:text-lg border-2 border-[#1a8fdd] rounded-full  px-2  py-1"
            >
              ADD COORDINATOR
            </button>
            <h1 className="text-red-600 font-semibold text-xs">
              This feature is optional ! You can add coordinators seperately
              later.
            </h1>
          </div>
        </div>
        {/* <p className="text-red-500 font-semibold text-lg">{error}</p> */}

        <button
          onClick={async() => {
            await addEvent(inputs);
            router.push("/admin/events");
          }}
          className=" md:text-xl border-2 font-semibold border-[#1a8fdd] w-1/2 md:w-1/3 mx-auto rounded-full px-2 py-1 text-[#1a8fdd]"
        >
          Submit
        </button>
      </div>

      <CoordinatorForm
        isOpen={isCoordinatorFormOpen}
        onClose={() => setIsCoordinatorFormOpen(false)}
        onAddCoordinator={handleAddCoordinator}
      />
      <LinkForm
        isOpen={isLinkFormOpen}
        onClose={() => setIsLinkFormOpen(false)}
        handleAddLink={handleAddLink}
      />
    </div>
  );
};

const LinkChip = ({
  name,
  link,
  index,
  handleAddLink,
  handleRemoveLink,
  isLinkFormOpen,
  setIsLinkFormOpen,
}: {
  name: string;
  link: string;
  index: number;
  isLinkFormOpen: boolean;
  setIsLinkFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddLink: (link: ILink) => void;
  handleRemoveLink: (index: number) => void;
}) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2 border px-4 py-1 rounded-xl border-[#1a8fdd]">
      <h1 className="font-semibold text-sm text-white">{name}</h1>
      <Link
        target="_blank"
        className="text-violet-300 font-medium text-xs"
        href={link}
      >
        {link}
      </Link>
      <div className="flex flex-row items-center gap-1">
        {
          <TbSquareRoundedPlusFilled
            onClick={() => setIsLinkFormOpen(true)}
            className="font-semibold cursor-pointer rounded-full"
            size={30}
          />
        }
        {
          <TbSquareRoundedMinusFilled
            onClick={() => handleRemoveLink(index)}
            className="font-semibold cursor-pointer rounded-full"
            size={30}
          />
        }
      </div>
      <LinkForm
        isOpen={isLinkFormOpen}
        onClose={() => setIsLinkFormOpen(false)}
        handleAddLink={handleAddLink}
      />
    </div>
  );
};
export default page;
