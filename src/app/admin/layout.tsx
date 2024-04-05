import AdminWrapper from "@/components/admin/AdminWrapper";
import CategoryChip from "@/components/admin/CategoryChip";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unstop Igniters Club RCCIIT",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="my-8 min-h-[80vh]">
      <AdminWrapper>
      <div className="flex flex-row  items-center gap-2 w-full mx-auto justify-center md:gap-4 lg:gap-10 flex-wrap">
        <CategoryChip name="Core" />
        <CategoryChip name="Tech" />
        <CategoryChip name="Creative" />
        <CategoryChip name="Sponsorship & Marketing" />
        <CategoryChip name="Social Media" />
      </div>
        {children}</AdminWrapper>
    </div>
  );
}
