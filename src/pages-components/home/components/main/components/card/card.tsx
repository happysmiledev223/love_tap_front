import { ArrowUpIcon, DollorIcon } from "@/icons";
import styles from "./card.module.css";
import Image from "next/image";
import { Props } from "./types";

export const Card = ({
  firstUser,
  secondUser,
  winuser,
  matchTitle,
  point,
  type
}: Props) => {
  return (
    <div className="rounded-[20px] py-[17px] px-[23px] border-[1.5px] border-solid border-[#FFFFFF80]">
      <div className="flex items-center justify-between">
        <p className="text-base text-[#FCFCFC] font-medium leading-[19.2px] tracking-[-0.40799999237060547px] text-left">
          {matchTitle}:
        </p>
      </div>
      <div className="w-[90%] mt-[13px] gap-x-7 flex">
        <div className="w-[45%] flex items-center gap-x-3">
          <Image
            width={35}
            height={35}
            alt="avatar"
            src={"/avatars/avatar-"+ (firstUser.id) +".png"}
            className="rounded-full"
          />
          <p className="text-sm text-[#FCFCFC] font-normal leading-[16.8px] tracking-[-0.40799999237060547px] text-left">
            {firstUser.name}
          </p>
        </div>
        <p className="text-sm text-[#FCFCFC] font-normal leading-[16.8px] tracking-[-0.40799999237060547px] text-left" style={{ paddingTop: '9px' }}>
            V.S
        </p>
        <div className="w-[45%] flex items-center gap-x-3">
          <p className="text-sm text-[#FCFCFC] font-normal leading-[16.8px] tracking-[-0.40799999237060547px] text-left">
            {secondUser.name}
          </p>
          <Image
            width={35}
            height={35}
            alt="avatar"
            src={"/avatars/avatar-"+ (secondUser.id) +".png"}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex gap-x-2 mt-[21px] mb-[18px] items-center">
        <div className="w-[45px] overflow-hidden  h-[45px] rounded-full bg-white">
          <Image
            width={45}
            height={45}
            alt="avatar"
            src={winuser.image}
            className="rounded-full"
          />
        </div>
        <p className="text-base font-normal text-[#FCFCFC] leading-[19.2px] tracking-[-0.40799999237060547px] text-left">
          Winner -{" "}
          <span className="text-base font-medium leading-[19.2px] tracking-[-0.40799999237060547px] text-left">
            {winuser.name}
          </span>
        </p>
      </div>
      {type != 0 ? <div className="flex justify-center text-[#FCFCFC] items-center gap-x-[6px]  border border-solid border-[#EAE2E242] py-[12px] w-full rounded-[8px]">
        {type == 1 ? "You Won " + point + " points" : "You Rose " + point + " points"}{" "}
        <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-[#FFBD3D]">
          <DollorIcon className="w-[6px] h-[11px]" />
        </div>
      </div> : null}
    </div>
  );
};
