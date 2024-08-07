"use client";
import Image from "next/image";
import {
  CongratulationsModal,
  Header,
  Card,
  Timer,
  RangeMoneyModal,
  VoteButton,
  YourTopPickModal
} from "./components";
import styles from "./main.module.css";
import React, { useCallback, useEffect, useState } from "react";
import backgroundImage from "../../../../../public/images/welcome-bg.png";
import NextBgImage from "next-bg-image";
import {userStore, gameStore, tmpbetStore, boardStore, womens,resultStore} from '../../../../stores/store'
import { aborted } from "util";
import { ArrowLeft, DollorIcon } from "@/icons";
import { useRouter } from "next/navigation";
import Ably from 'ably';
import { addRequestMeta } from "next/dist/server/request-meta";

export const Main = () => {

  type Match = number[];

  const router = useRouter();
  const rounds = [1,2,3,4,5,6];
  const rounds1 = [1,2,3,4,5];

  const bets = boardStore((state) => state.bets);
  const setPlayerId = tmpbetStore((state) => state.setPlayerId);
  const setPlayer = tmpbetStore((state) => state.setPlayer);
  const points = userStore((state) => state.points);
  const isPreparing = gameStore((state) => state.isPreparing);
  const setIsPreparing = gameStore((state) => state.setIsPreparing);
  const matches = gameStore((state: { matches: Array<Match> }) => state.matches);
  const roundId = gameStore((state) => state.roundId);
  const setRoundId = gameStore((state) => state.setRoundId);
  const isFirst = userStore((state) => state.isFirst);aborted
  const [currentRound, setCurrentRound] = useState(roundId-1);
  const [open, setOpen] = useState(false);
  const [depozet, setDepozet] = useState(false);
  const [yourPick, setYourPick] = useState(isFirst);
  const id = userStore((state) => state.id);
  const setEndAt = gameStore((state) => state.setEndAt);
  const userId = userStore((state) => state.id);
  const setMatches = gameStore((state) => state.setMatches);
  const setPoints = userStore((state) => state.setPoints);  //Set Points

  const roundResults = resultStore((state: {roundResults: Array<Array<Match>>}) => state.roundResults);
  const addRoundResults = resultStore((state) => state.addRoundResults);
  const setWinner = resultStore((state) => state.setWinner);
  const [lastUpdatedPoints, setLastUpdatedPoints] = useState(points);

  const getNamefromId = (id: number): string => {
    const woman = womens.find(woman => woman.id === id);
    return woman ? woman.name : "";
  };

  const getWinnerfromMatch = (match: Match): number => {
    for(var i=0;i<roundResults[currentRound+1].length;i++){
      var winner_1 = roundResults[currentRound+1][i][0];
      var winner_2 = roundResults[currentRound+1][i][1];
      if(winner_1 == match[0] || winner_1 == match[1]) return winner_1;
      if(winner_2 == match[0] || winner_2 == match[1]) return winner_2;
    }
    return 0;
  };

  const getTypefromMatch = (match: Match, winner: number): number =>{
    if(isExist(match[0],currentRound + 1)){
      if(winner == match[0]) return 1;
      else return 2;
    }
    if(isExist(match[1],currentRound + 1)){
      if(winner == match[1]) return 1;
      else return 2;
    }
    return 0;
  }

  const getBetPoint = (match: Match) : number =>{
    if(isExist(match[0],currentRound + 1)){
      return getPoint(match[0],currentRound + 1);
    }
    if(isExist(match[1],currentRound + 1)){
      return getPoint(match[1],currentRound + 1);
    }
    return 0;
  }

  const handleBet = (id: any) => {
    setPlayer(getNamefromId(id));
    setPlayerId(id);
    setDepozet(true);
  };

  const isExist = (id: any, roundId: any) =>{
    for(var i=0;i<bets.length;i++){
      if(bets[i].womenId == id && bets[i].roundNum == roundId) return true;
    }
    return false;
  }

  const getPoint = (id: any, roundId: any) =>{
    for(var i=0;i<bets.length;i++){
      if(bets[i].womenId == id && bets[i].roundNum == roundId) return bets[i].points;
    }
    return 0;
  }

  
  useEffect(() => {
    const ably = new Ably.Realtime('Y0JswA.a8WNqg:NylcmIvzGaGj1ptBdMjnQ7pFRgicUHnKIoViuZHObxo');
    ably.connection.once("connected", () => {
      console.log("Connected to Ably!")
    })
    const channel = ably.channels.get('broadcast-channel');
    channel.attach();
    // Use an async function to handle the subscription
    const setupSubscription = async () => {
      try {
        await channel.subscribe('broadcast-event', (message) => {
          const msg = message.data?.message?.msg;
          if(msg == "New Round Data")
            console.log(message.data?.message);
          const endAt = message.data?.message?.endAt * 60 * 1000;
          const roundId = message.data?.message?.roundId;
          const gameStatus = message.data?.message?.gamestatus;
          switch(msg){
            case "Round Started":
              setIsPreparing(false);
              setEndAt(endAt);
              setCurrentRound(roundId-1);
              setRoundId(roundId);
              getPoints();
              break;
            case "Game Ended":
              setIsPreparing(true);
              setEndAt(endAt);
              setCurrentRound(roundId-1);
              setRoundId(roundId);
              break;
            case "Round Ended":
              setIsPreparing(true);
              setEndAt(endAt);
              setCurrentRound(roundId-1);
              setRoundId(roundId);
              break;
            case "Prepare Started":
              setIsPreparing(true);
              setEndAt(endAt);
              setCurrentRound(roundId-1);
              setRoundId(roundId);
              break;
            case "New Round Data":
              setMatches(gameStatus.matches);
              addRoundResults(gameStatus.matches);
              break;
            default:
              break;
          }
        });
        console.log('Subscribed to channel');
      } catch (error) {
        console.error('Error subscribing to channel:', error);
      }
    };

    setupSubscription();

    // Cleanup function
    return () => {
      const cleanUp = async () => {
        try {
          await channel.unsubscribe();
          ably.close();
          console.log('Unsubscribed and closed connection');
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      };

      cleanUp();
    };
  }, [setEndAt, setIsPreparing, addRoundResults,setMatches,setRoundId]);

  async function getPoints(){
    // fetch("https://love-tap-telegram-mini-app-backend.vercel.app/user/getPoint/?id=" + userId, {
    fetch("http://localhost:4000/user/getPoint/?id=" + userId, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      setPoints(data.info);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with your fetch operation:', error);
    });
  }

  const updatePoints = useCallback(() => {
    fetch("https://love-tap-telegram-mini-app-backend.vercel.app/user/updatePoints/", {
    // fetch("http://localhost:4000/user/updatePoints/", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        points: points
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update lastUpdatedPoints after successful update
      setLastUpdatedPoints(points);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }, [id, points]);
  
  useEffect(() => {
    // Check if points have increased by 100 or more
    if (points - lastUpdatedPoints >= 100) {
      updatePoints();
    }
  }, [points, lastUpdatedPoints, updatePoints]);


  return (
    <NextBgImage
      src={backgroundImage}
      className={`w-full pb-[70px] h-full min-h-screen relative`}
    >
      <Header />
      <div className="px-4 my-4">
        <div className="horizontal-scroll overflow-x-auto overflow-y-hidden flex gap-x-[75px]">
          {rounds1.map((round, index) => (
            <div key={index} className="flex text-[#FCFCFC]  gap-x-1" onClick={() =>setCurrentRound(index)}>
              <p
                className={` ${
                  index === currentRound ? "font-[700] text-base" : "font-normal text-sm"
                } leading-[16.8px] tracking-[-0.40799999237060547px] text-right`}
              >
                ROUND
              </p>
              <p
                className={`${
                  index === currentRound ? "font-[700] text-base" : "font-normal text-sm"
                } leading-[16.8px] tracking-[-0.40799999237060547px] text-right`}
              >
                {round}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-[16px]">
        <p className="text-sm mt-[13px] font-normal leading-[16.8px] tracking-[-0.40799999237060547px] text-left text-[#FCFCFC]">
        { isPreparing == true ? (currentRound+2 == roundId ? "Round has ended" : ( currentRound+1 == roundId ? "Round will be started." : "Round has not started yet.") ) :(currentRound + 1 == roundId ? "Choose which woman you think will win." : ( currentRound+1 < roundId ? "Round has finished." : "Round has not started yet."))}
        </p>
        { isPreparing == true ? (currentRound+2 == roundId ? <Timer type={"Result"}/> : ( currentRound+1 == roundId ? <Timer type={"start"}/> : null) ) :(currentRound + 1 == roundId ? <Timer type={"end"}/> : ( currentRound + 1 == roundId + 1 ? <Timer type={"start"}/> : null))}
      </div>
      <div className={`flex ${currentRound +1 < roundId ?  `px-[20px]` : `pl-[50px]`} max-w-full py-[20px] pt-[30px] scrollbar-hide overflow-x-auto h-full`}>
        {currentRound +1 < roundId ? (
          (isPreparing == false || currentRound + 2 < roundId) && 
          <div className="w-full items-center pt-[10px] flex flex-col justify-between">
            <h1 className="text-[19px] text-[#FCFCFC] font-bold leading-[22.99px] text-center">
              Round Results
            </h1>
            <div className="px-[18px] w-full">
              <div className="py-[14px] my-6 gap-x-[6px] rounded-[8px] flex justify-center  items-center  bg-[#ffffff2e] w-full">
                <p className="text-base font-normal text-[#FCFCFC] leading-[19.2px] tracking-[-0.40799999237060547px] text-left">
                  Your total points:{" "}
                  <span className="font-[700] text-[19px]">{points}</span>
                </p>
                <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-[#FFBD3D]">
                  <DollorIcon className="w-[6px] h-[11px]" />
                </div>
              </div>
            </div>
            <div className="px-[18px] w-full flex flex-col gap-y-4">
              {roundResults[currentRound]?.map((match, index) => (
                <Card
                  key={`match-${index}`}
                  matchTitle={`Match ${index + 1}`}
                  firstUser={{
                    name: getNamefromId(match[0]) ?? "Unknown",
                    id: match[0],
                  }}
                  secondUser={{
                    name: getNamefromId(match[1]) ?? "Unknown",
                    id: match[1],
                  }}
                  winuser={{
                    name: getNamefromId(getWinnerfromMatch(match)) ?? "Unknown",
                    image: "/avatars/avatar-" + getWinnerfromMatch(match) +".png",
                  }}
                  point = { getBetPoint(match) }
                  type={ getTypefromMatch(match,getWinnerfromMatch(match)) }
                />
              ))}
            </div>
          </div>
        ) : 
        rounds.slice(roundId-1,roundId+1).map((roundIndex) => (
          currentRound + 1 == roundId && isPreparing == false && <div
            key={roundIndex}
            className="flex justify-around gap-y-[50px] flex-col"
          >
            { roundIndex === roundId ? (
              matches.map((match, matchIndex) => (
                  match.map((id) => (
                    <div key={id} className="flex items-center h-full ">
                      <div className="flex h-full items-center">
                        <div className="flex flex-col gap-y-4 items-center">
                          <div className="w-[120px] relative h-[120px] rounded-[4px] bg-white">
                            <Image
                              src={"/avatars/avatar-"+ (id) +".png"}
                              alt="avatar"
                              width={120}
                              height={120}
                              className={`${isExist(id,roundId) ? `rounded-[4px] border-[4px] border-[#9454B7]` : null}`}
                            />
                            <VoteButton womenId = {id} />
                          </div>
                          <button
                            onClick={() =>
                              handleBet(id)
                            }
                            disabled={isExist(id,roundId)}
                            className={`${styles.button_bg} ${isExist(id,roundId) ? styles.button_disabled: null } drop-shadow-md text-[14px] w-[120px] font-semibold leading-[13.2px] tracking-[-0.40799999237060547px] text-center  rounded-[45px]  py-[8px]  text-[#FCFCFC]`}
                          >
                            BET ON {getNamefromId(id)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ))
            ) : (
              matches.map((match : Match, matchIndex:number) => (
                <div key={matchIndex} className="flex items-center h-full ">
                  <div className="pr-[15px] py-[18px] flex items-center mr-[25px] relative h-[55%] rounded-r-[8px] border-b border-b-[#CBC7C8] border-t border-t-[#CBC7C8] border-r border-r-[#CBC7C8] pl-[9.5px]">
                    <div className="h-[1px] absolute right-[-30px] top-1/2  w-[30px] bg-[#957EAA]"></div>
                  </div>
                  <div className="flex h-full items-center">
                    <div className="flex flex-col gap-y-4 items-center">
                      <div className="w-[120px] relative h-[120px] rounded-[4px] bg-white">
                        <Image
                          src={"/images/question.png"}
                          alt="avatar"
                          width={120}
                          height={120}
                        />
                      </div>
                      <div className="py-[8px]"></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      <Image
        src={"/images/tournoment-assent-image.png"}
        alt="img"
        width={80}
        height={150}
        className="absolute top-[200px] right-0"
      />
      <Image
        width={135}
        height={98}
        alt="img"
        src={"/images/tournoment-assent-image-2.png"}
        className="absolute bottom-0 right-12"
      />
      <CongratulationsModal open={open} close={() => setOpen(false)} />
      <RangeMoneyModal close={() => setDepozet(false)} open={depozet}/>
      <YourTopPickModal open={yourPick} close={() => setYourPick(false)} />
    </NextBgImage>
  );
};
