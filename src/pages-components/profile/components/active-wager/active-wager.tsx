"use client";
import { ArrowUpIcon } from "@/icons";
import styles from "./active-wager.module.css";
import { boardStore, gameStore, womens } from "../../../../stores/store";

export const ActiveWager = () => {

  const bets = boardStore((state) => state.bets);
  
  const getNamefromId = (id: number): string | undefined => {
    const woman = womens.find(woman => woman.id === id);
    return woman ? woman.name : undefined;
  };
  
  return (
  <div className="w-full px-[18px] pt-6">
    <div className="flex items-center justify-between">
      <h1 className="text-[19px] font-bold text-white leading-[22.99px] text-left">
        Wagers to Bets
      </h1>
      <button className={styles.text}>See all</button>
    </div>
    <div className="flex flex-col gap-y-4 mt-4">
      {bets.map((bet : any, index : any) => (
        <div
          key={index}
          className="pt-[17px] rounded-[20px] pl-[22px] pb-[22px] pr-[23px] border border-solid border-[#FFFFFF80]"
        >
          <div className="flex justify-between">
            <p className=" text-white text-base font-medium leading-[19.2px] tracking-[-0.40799999237060547px] text-left">
              Match {index + 1}:
            </p>
            <ArrowUpIcon className="text-[#E9E4E69C]" />
          </div>
          <div className="mt-[10px]">
            <p className="text-base font-medium leading-[19.2px] tracking-[-0.40799999237060547px] text-left text-white">{`${getNamefromId(bet.match[0])} vs. ${getNamefromId(bet.match[1])} - ${bet.points} points`}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
