"use client";
import { ArrowLeft } from "@/icons";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center pt-3 px-[13px] items-center">
      <h1 className="flex items-center text-[#FCFCFC] text-[19px] font-bold leading-[22.99px] text-center">
        Tournament Bracket
      </h1>
      <div />
    </div>
  );
};
