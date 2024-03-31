import { useUser } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormElement from "../common/FormElement";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import RegFormElement from "./RegFormElement";
import { validateEventReg } from "@/utils/functions/validate";
import { eventReg } from "@/utils/functions/eventReg";

const EventRegModal = ({
  isOpen,
  onClose,
  eventDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: any;
}) => {
  const router = useRouter();
  const eventId = eventDetails?.id;
  const [inputs, setInputs] = useState<any>({
    teamName: "",
    teamLeadPhone: "",
    teamLeadEmail: "",
    teamLeadName: "",
    fileName: "",
    college: "",
  });

  const [file, setFile] = useState<any>(null);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      fileName: selectedFile.name,
    }));
  };

  const user = useUser((state) => state.user);
  const minTeamMember = eventDetails?.min_team_size;
  const maxTeamMember = eventDetails?.max_team_size;
  useEffect(() => {
    if (user) {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        teamLeadPhone: user.phone,
        teamLeadEmail: user.email,
        teamName: maxTeamMember > 1 ? "" : user.name, // Set teamName as blank if maxTeamMember > 1
        teamLeadName: user.name,
        college: user.college,
      }));
    }
  }, [user, maxTeamMember]);

  console.log(inputs);
  const [participants, setParticipants] = useState<any>([]);
  useEffect(() => {
    if (minTeamMember !== undefined && minTeamMember !== null) {
      const blankParticipants = [];
      for (let i = 0; i < minTeamMember; i++) {
        blankParticipants.push({ phone: "", email: "", name: "" });
      }
      setParticipants(blankParticipants);
    }
  }, [minTeamMember]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
    if (maxTeamMember == 1) {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        teamLeadName: prevInputs.teamName,
      }));
    }
  };

  const handleEmailChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].email = value;
    if (index == 0) {
      updatedParticipants[0].email = inputs.teamLeadEmail;
    }
    setParticipants(updatedParticipants);
  };
  const handleNameChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = value;
    if (index == 0) {
      updatedParticipants[0].name = inputs.teamLeadName;
    }
    setParticipants(updatedParticipants);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].phone = value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { phone: "", name: "" }]);
  };
  const removeParticipant = (index: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const [generalErrors, setGeneralErrors] = useState<any>({});
  const [teamErrors, setTeamErrors] = useState<any>({});
  let teamMemberCountError = "";

  const handleSubmit = async () => {
    try {
      const res = validateEventReg(
        inputs,
        eventDetails.event_type,
        participants,
        maxTeamMember,
        file
      );
      console.log(res);
      const allFieldsEmpty =
        Object.values(res.errors).every((value) => value === "") &&
        res.teamErrors.every(
          (participant: any) =>
            participant.name === "" &&
            participant.phone === "" &&
            participant.email === ""
        );
      if (allFieldsEmpty) {
        await eventReg(inputs, participants, file, eventId);
        toast.success("Registration Successful");
        onClose();
        router.push("/");
      }
      if (res.errors || res.teamErrors) {
        setGeneralErrors(res.errors);
        setTeamErrors(res.teamErrors);
        toast.error("Fill all the fields accurately !");
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration Failed !");
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-[#01071c]  p-4 rounded-lg ${
              maxTeamMember > 1 && eventDetails.registration_through_portal
                ? "h-[80vh] md:h-[70vh]"
                : eventDetails.registration_through_portal
                ? "h-[70vh]"
                : ""
            }  w-[95%] flex flex-col items-start border-y border-[#1a8fdd] lg:w-1/3 lg:px-16 lg:py-8`}
          >
            <div className="w-full flex flex-row mb-2 items-center text-[#1a8fdd] justify-between">
              <h2 className="text-sm lg:text-lg font-semibold">
                Registration of Event
              </h2>
              <h2
                onClick={onClose}
                className="bg-[#1a8fdd] md:py-2 md:px-3 px-2 py-1 -mr-3 hover:bg-white hover:text-[#1a8fdd] border-2 border-[#1a8fdd]  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            {eventDetails.registration_through_portal ? (
              <div className="flex w-full overflow-x-hidden flex-col  items-center gap-4 overflow-y-scroll text-sm lg:text-lg">
                <div className="flex flex-col items-center w-full gap-2 justify-center mx-auto">
                  <RegFormElement
                    type="text"
                    disabled={maxTeamMember > 1 ? false : true}
                    name={maxTeamMember > 1 ? "Team Name" : "Name"}
                    value={inputs.teamName}
                    id="teamName"
                    onChange={handleInputChange}
                    width="100%"
                  />
                  <h1 className="text-red-600 font-semibold text-xs">
                    {generalErrors.teamName}
                  </h1>
                  <RegFormElement
                    type="number"
                    disabled={maxTeamMember > 1 ? true : true}
                    name={maxTeamMember > 1 ? "Team Lead Phone" : "Phone"}
                    value={inputs.teamLeadPhone}
                    id="teamLeadPhone"
                    onChange={handleInputChange}
                    width="100%"
                  />
                  <h1 className="text-red-600 font-semibold text-xs">
                    {generalErrors.teamLeadPhone}
                  </h1>

                  {maxTeamMember > 1 && (
                    <RegFormElement
                      type="text"
                      disabled={maxTeamMember > 1 ? true : true}
                      name={maxTeamMember > 1 ? "Team Lead Name" : "Name"}
                      value={inputs.teamLeadName}
                      id="teamLeadName"
                      onChange={handleInputChange}
                      width="100%"
                    />
                  )}
                  <h1 className="text-red-600 font-semibold text-xs">
                    {generalErrors.teamLeadName}
                  </h1>
                  <RegFormElement
                    type="email"
                    disabled={maxTeamMember > 1 ? true : true}
                    name={maxTeamMember > 1 ? "Team Lead Email" : "Email"}
                    value={inputs.teamLeadEmail}
                    id="teamLeadEmail"
                    onChange={handleInputChange}
                    width="100%"
                  />
                  <h1 className="text-red-600 font-semibold text-xs">
                    {generalErrors.teamLeadEmail}
                  </h1>
                  <RegFormElement
                    type="text"
                    name={"College"}
                    value={
                      user?.college !== null ? user?.college : inputs.college
                    }
                    id="college"
                    onChange={handleInputChange}
                    width="100%"
                  />
                  <h1 className="text-red-600 font-semibold text-xs">
                    {generalErrors.college}
                  </h1>

                  {eventDetails?.event_type === "Submission" && (
                    <div className="flex flex-row gap-2 flex-wrap text-sm items-center">
                      <label
                        htmlFor="fileName"
                        className="font-semibold text-[#1a8fdd]"
                      >
                        Submission File :
                      </label>
                      <input
                        type="file"
                        id="fileName"
                        className="font-semibold text-white"
                        onChange={handleFileChange}
                      />
                      <h1 className="text-red-600 font-semibold text-xs">
                        {generalErrors.fileName}
                      </h1>
                    </div>
                  )}
                </div>

                {maxTeamMember > 1 && (
                  <div className="flex flex-col items-center gap-5">
                    <h1 className="font-semibold text-[#1a8fdd]">
                      Add Team Participants
                    </h1>
                    {teamMemberCountError !== "" && (
                      <h1 className="text-red-600 font-semibold text-xs">
                        {teamMemberCountError}
                      </h1>
                    )}
                    {participants.map((participant: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-row   items-center gap-10 flex-wrap border-2 text-sm  px-10 py-2 pb-5 border-[#1a8fdd] rounded-lg"
                      >
                        <div className="flex flex-col  items-start gap-2">
                          <label htmlFor="" className="font-semibold">
                            {index == 0 ? "Team Lead" : `Person ${index + 1}`}
                          </label>

                          <div className="flex flex-col items-start gap-3">
                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="email" className="text-[#1a8fdd]">
                                Email :
                              </label>
                              <input
                                type="text"
                                id="email"
                                disabled={index == 0 ? true : false}
                                value={
                                  index == 0
                                    ? (participant.email = inputs.teamLeadEmail)
                                    : participant.email
                                }
                                onChange={(e) =>
                                  handleEmailChange(index, e.target.value)
                                }
                                className={`w-full border-b border-[#1a8fdd] text-white px-2 py-1 max-md:w-full focus:border-b bg-transparent `}
                              />
                              {teamErrors && teamErrors[index] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[index].email}
                                </h1>
                              )}
                            </div>

                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="name" className="text-[#1a8fdd]">
                                Name :
                              </label>
                              <input
                                type="text"
                                id="name"
                                disabled={index == 0 ? true : false}
                                value={
                                  index == 0
                                    ? (participant.name = inputs.teamLeadName)
                                    : participant.name
                                }
                                onChange={(e) =>
                                  handleNameChange(index, e.target.value)
                                }
                                className={`w-full border-b border-[#1a8fdd] text-white px-2 py-1 max-md:w-full focus:border-b bg-transparent `}
                              />
                              {teamErrors && teamErrors[index] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[index].name}
                                </h1>
                              )}
                            </div>

                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="phone" className="text-[#1a8fdd]">
                                Phone :
                              </label>
                              <input
                                type="text"
                                disabled={index == 0 ? true : false}
                                value={
                                  index == 0
                                    ? (participant.phone = inputs.teamLeadPhone)
                                    : participant.phone
                                }
                                onChange={(e) =>
                                  handlePhoneChange(index, e.target.value)
                                }
                                className={`w-full border-b border-[#1a8fdd] text-white px-2 py-1 max-md:w-full focus:border-b bg-transparent `}
                              />
                              {teamErrors && teamErrors[index] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[index].phone}
                                </h1>
                              )}
                            </div>
                          </div>
                        </div>

                        {participants.length > minTeamMember && (
                          <button
                            onClick={() => removeParticipant(index)}
                            className="border-2 border-black rounded-full px-2 py-1 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {participants.length < maxTeamMember && (
                      <button
                        onClick={addParticipant}
                        className="font-semibold border-2 text-sm border-[#1a8fdd] bg-[#1a8fdd] text-white px-5 py-2 rounded-full hover:bg-white hover:text-[#1a8fdd]"
                      >
                        Add Person
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                {eventDetails?.registration_link && (
                  <Link
                    href={eventDetails.registration_link}
                    target="_blank"
                    className="border-2 mt-3 border-red-500 px-5 py-1 rounded-full font-semibold bg-red-500 text-white hover:bg-white hover:text-red-500"
                  >
                    Fill Form
                  </Link>
                )}
              </div>
            )}
            {eventDetails.registration_through_portal ? (
              <div className="flex flex-row items-center pt-5 flex-wrap justify-between w-full">
                <button
                  className="border-2 mt-3 border-red-500 px-5 py-1 rounded-full font-semibold bg-red-500 text-white hover:bg-white hover:text-red-500"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="border-2 mt-3 border-[#1a8fdd] px-5 py-1 rounded-full font-semibold bg-[#1a8fdd] text-white hover:bg-white hover:text-[#1a8fdd]" // hover:bg-white hover:text-black
                >
                  Submit
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Toaster position="bottom-right" richColors />
        </div>
      )}
    </>
  );
};

export default EventRegModal;
