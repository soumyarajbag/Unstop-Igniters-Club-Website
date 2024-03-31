import parse from "html-react-parser";
const RulesModal = ({
  isOpen,
  onClose,
  rules,
}: {
  isOpen: boolean;
  onClose: () => void;
  rules: string;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={` p-4 rounded-lg bg-[#01071c] text-white ${
              rules.length < 700 ? "h-auto" : "h-[80%]"
            } w-[90%] flex flex-col items-end md:w-[50%] lg:w-[35%] border-y border-[#1a8fdd]`}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a8fdd]">
                Rules of the Event
              </h2>

              <h2
                onClick={onClose}
                className="bg-[#1a8fdd] md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-[#1a8fdd] border-2 border-[#1a8fdd]  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div className="h-full overflow-y-scroll text-start my-1 py-2 px-1 w-full">
              {parse(rules!)}
            </div>
            <button
              className="border-2 mt-3 border-[#1a8fdd] px-5 py-1 rounded-full font-semibold bg-[#1a8fdd] text-white hover:bg-white hover:text-[#1a8fdd]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RulesModal;
