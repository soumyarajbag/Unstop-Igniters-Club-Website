"use client";
import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import FormElement from "../common/FormElement";
import { validateUserReg } from "@/utils/functions/validate";
import { supabase } from "@/lib/supabase-client";
import { useUser } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const Registration = () => {
  const user = useUser((state) => state.user);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: "",
    college: "",
    phone: "",
    college_roll: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    college: "",
    gender: "",
    college_roll: "",
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

  useEffect(()=>{
    if(user){
      setInputs((prevInputs) => ({
        ...prevInputs,
        name: user.name,
        college: user.college,
        phone: user.phone,
        college_roll: user.college_roll,
        gender:user.gender
      }));
    }
  },[user])
  const handleSubmit = async () => {
    try {
      const validation = validateUserReg(inputs);
      console.log(validation);
      const allFieldsEmpty = Object.values(validation).every(
        (value) => value === ""
      );
      console.log(allFieldsEmpty)
      if (allFieldsEmpty) {
        console.log(inputs);
        const { error } = await supabase
          .from("users")
          .update({
            name: inputs.name,
            college: inputs.college,
            phone: inputs.phone,
            college_roll: inputs.college_roll,
            gender: inputs.gender,
          })
          .eq("id", user?.id);
        if (error) {
          throw error;
        }
        router.push("/events");
        router.refresh();
        toast.success("Registration Successful");
      }
      if (!allFieldsEmpty) {
        setErrors(validation);
        toast.error("Fill all the fields accurately !");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="flex flex-col items-center gap-5 justify-center my-10">
      <Toaster position="bottom-right" richColors duration={4000} />
      <Heading text="Registration" />
      <div className="flex flex-row max-lg:flex-wrap w-[80%] mx-auto items-start gap-5 justify-center">
        <div className="w-full mx-auto flex flex-col  gap-10  p-10  lg:w-[40%] bg-[#01071c] rounded-xl border border-white">
          <FormElement
            id="name"
            name="Name"
            type="text"
            value={inputs.name}
            onChange={handleInputChange}
            width="100%"
          />
          {errors.name && (
            <h1 className="text-red-600 font-semibold text-xs">
              {errors.name}
            </h1>
          )}

          <FormElement
            id="email"
            name="Email"
            type="email"
            disabled={true}
            value={user?.email!}
            onChange={handleInputChange}
            width="100%"
          />
          <div className="flex flex-row items-center gap-2">
            <div className=" p-2 rounded-xl text-lg bg-transparent border border-[#1a8fdd] text-[#1a8fdd] font-semibold">
              +91
            </div>
            <FormElement
              id="phone"
              name="Phone"
              type="text"
              value={inputs.phone}
              onChange={handleInputChange}
              width="100%"
            />
          </div>
          {errors.phone && (
            <h1 className="text-red-600 font-semibold text-xs">
              {errors.phone}
            </h1>
          )}
          <FormElement
            id="college"
            name="College"
            type="text"
            value={inputs.college}
            onChange={handleInputChange}
            width="100%"
          />
          <div className="flex flex-col items-start gap-1">
            <FormElement
              id="college_roll"
              name="College Roll"
              type="text"
              value={inputs.college_roll}
              onChange={handleInputChange}
              width="100%"
            />
            <h1 className="text-md text-red-400 font-semibold text-start">
              Roll Only for College students.
            </h1>
          </div>
          {errors.college_roll && (
              <h1 className="text-red-600 font-semibold text-xs">
                {errors.college_roll}
              </h1>
            )}
       
          <div className="flex flex-row flex-wrap items-center md:gap-5 text-white font-semibold">
            <label
              htmlFor="gender"
              className="text-[#1a8fdd] font-semibold text-base md:text-lg"
            >
              Gender :{" "}
            </label>
            <div className="flex flex-row flex-wrap items-center max-md:justify-between w-full  gap-10  md:items-center md:gap-16 ">
              <label className="flex flex-row items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="male"
                  className="text-white bg-black"
                  checked={inputs.gender === "male"}
                  onChange={handleInputChange}
                  required={true}
                />
                Male
              </label>
              <label className="flex flex-row items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="female"
                  className="text-white bg-black"
                  checked={inputs.gender === "female"}
                  onChange={handleInputChange}
                  required={true}
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <h1 className="text-red-600 font-semibold text-xs">
                {errors.gender}
              </h1>
            )}
            <button
              onClick={handleSubmit}
              className="bg-[#1a8fdd] mt-5 mx-auto text-white px-10 py-3 hover:text-[#1a8fdd] hover:bg-transparent border border-[#1a8fdd] rounded-xl font-semibold"
            >
              Register
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[40%] mx-auto">
          <Image
            src="https://i.postimg.cc/Z5hxz7Td/unstop.png"
            className="mx-auto py-10"
            width={500}
            height={500}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
