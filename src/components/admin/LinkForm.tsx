"use client";
import { ICoordinator, ILink } from "@/app/admin/events/add-event/page";
import { useState } from "react";

const LinkForm = ({
  isOpen,
  onClose,
  handleAddLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleAddLink: (link: ILink) => void;
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = () => {
    if (title && url) {
        handleAddLink({ title, url });
        setTitle("");
        setUrl("");
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#01071c] text-[#1a8fdd] border-y border-[#1a8fdd] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Link</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="px-2 py-1 rounded-xl bg-transparent text-[#1a8fdd] border border-[#1a8fdd]"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
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

export default LinkForm;
