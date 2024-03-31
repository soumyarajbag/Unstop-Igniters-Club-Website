const Heading = ({ text }: { text: string }) => {
    const letters = text.split("");
    return (
      <div className="w-full text-center">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="text-2xl text-center tracking-wider text-[#0addf0]  md:text-3xl cursor-pointer duration-500 lg:text-4xl font-bold hover:scale-y-110 hover:text-orange-800"
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };
  
  export default Heading;