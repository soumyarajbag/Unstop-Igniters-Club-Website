import Link from "next/link";
import React, { Children } from "react";

const AdminTab = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link}>
      <button className="bg-[#1a8fdd] hover:bg-opacity-50 hover:text-white text-white rounded-xl px-6 py-2 text-xl font-semibold">
        {text}
      </button>
    </Link>
  );
};
const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex flex-row items-center gap-5">
        <AdminTab text="Events" link="/admin/events" />
        <AdminTab text="Users" link="/admin/users" />
        <AdminTab text="Feedback" link="/admin/feedback" />
      </div>
      {children}
    </div>
  );
};

export default AdminWrapper;
