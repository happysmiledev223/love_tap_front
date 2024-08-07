"use client";
import { Button } from "@/common";
import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image";
import { Props } from "./types";

/* eslint-disable react/no-unescaped-entities */
export const Letsgo = ({ setIsLetsgo }: Props) => {
  return (
    <div className="min-h-[90vh] px-[18px] flex flex-col justify-center items-center">
      <Image
        src={"https://i.ibb.co/VmpCFyp/letsgo-assents-01.png"}
        loader={({src}) => src}
        quality={70}
        alt="img"
        width={120}
        height={135}
        priority={true}
        className="absolute bottom-0 right-0"
      />
      <Image
        src={"https://i.ibb.co/3CGSzyj/letsgo-assents-02.png"}
        loader={({src}) => src}
        quality={70}
        alt="img"
        width={120}
        height={120}
        priority={true}
        className="absolute top-0 left-0"
      />
      <Image
        src={"https://i.ibb.co/VBSZDB0/letsgo-assents-03.png"}
        loader={({src}) => src}
        quality={70}
        alt="img"
        width={58}
        height={114}
        priority={true}
        className="absolute top-[30px] right-0"
      />
      <div className="flex flex-col items-center z-[1]">
        <h1 className="text-[19px] font-bold leading-[22.99px] text-center text-[#FCFCFC]">
          Let's get started!
        </h1>
        <p className="text-base font-normal w-[75%]  mt-2  mb-6 text-[#FCFCFC] leading-[19.2px] text-[#FCFCFC]] tracking-[-0.40799999237060547px] text-center">
          We'll now to go the tournament bracket where you can place your votes
          and bets on each round.
        </p>
        <Button onClick={() => setIsLetsgo(true)}>Continue</Button>
      </div>
    </div>
  );
};
