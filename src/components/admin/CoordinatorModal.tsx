"use client";
import { ICoordinator } from "@/app/admin/events/add-event/page";
import { useEffect, useState } from "react";
import SelectInput from "../common/SelectInput";
import { fetchEventsName } from "@/utils/functions/fetchEventsName";
import { addCoordinator } from "@/utils/functions/addCoordinator";

const CoordinatorModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [eventOptions, setEventOptions] = useState<string[]>([]); // [1
  const [eventName, setEventName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    if (eventName && email) {
      await addCoordinator(eventName, email);
      setEventName("");
      setEmail("");
      onClose();
    }
  };
  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEventsName();
      const events = data && data.map((event: any) => event.event_name);
      setEventOptions(events!);
    };
    getEvents();
  }, []);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#01071c] text-[#1a8fdd] border-y border-[#1a8fdd] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Coordinator</h2>
            <div className="flex flex-col gap-4">
              <SelectInput
                id="eventName"
                name="Event Name"
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
                options={eventOptions}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

export default CoordinatorModal;
