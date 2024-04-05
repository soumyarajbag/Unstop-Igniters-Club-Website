import Link from "next/link";

 const CategoryChip = ({ name}: { name: string }) => {  
    return (
      <Link href={"/team/" + name} className="bg-[#1a8fdd] text-white py-2  lg:py-2 text-xs  lg:text-sm xl:text-lg px-5 md:px-10 border-2 cursor-pointer border-black hover:bg-white hover:text-black rounded-xl  font-semibold">
        {name}
      </Link>
    );
}
export default CategoryChip;