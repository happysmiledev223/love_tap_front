"use client";
import { Button, Stepper } from "@/common";
import { FirstStep, Letsgo, SecondStep, ThirdStep, SelectTopPick } from "./components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertModal } from "./components/select-top-pick/components/alert";
import NextBgImage from "next-bg-image";
import backgroundImage from "../../../public/images/welcome-bg.png";
import loadingImage from "../../../public/images/loading.gif";
import {userStore, selectStore, womens, gameStore, boardStore, resultStore} from '../../stores/store';
import { useInitData } from '@tma.js/sdk-react';
import Image from "next/image";
import { stat } from "fs";

export const WelcomePage = () => {  
  type GameStatus = {
    id: number;
    name: string;
  }

  const initData = useInitData(true);
  
  const setMatches = gameStore((state) => state.setMatches);
  const setRoundId = gameStore((state) => state.setRoundId);
  const roundId = gameStore((state) => state.roundId);
  const setEndAt = gameStore((state) => state.setEndAt);
  const setIsPreparing = gameStore((state) => state.setIsPreparing);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false)
  const [isLetsgo, setIsLetsgo] = useState(false);

  const router = useRouter();
  const userId = userStore((state) => state.id);
  const setId = userStore((state) => state.setId);   // User ID
  const setUserName = userStore((state) => state.setUsername); //Telegram username
  const setPoints = userStore((state) => state.setPoints);  //Set Points
  const setavatar = userStore((state) => state.setavatar);
  const topPick = userStore((state) => state.topPick);
  const setTopPick = userStore((state) => state.setTopPick);
  const setIsFirst = userStore((state) => state.setIsFirst);
  const setBet = boardStore((state) => state.setBet);

  const setSrc = selectStore((state) => state.setSrc);
  const addRoundResults = resultStore((state) => state.addRoundResults);
  const setName = selectStore((state) => state.setName);
  const id = selectStore((state) => state.id); //top pick id


  const handleContinue = async () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
    else if (step === 3){
      if (!id) {
        setOpen(true)
      } else {
        await StoreTopPicK();
        router.push("/home");
      }
    }
  };

  async function StoreTopPicK(){
    // fetch("https://love-tap-back.vercel.app/?womenId=" + id + "&id=" + userId, {
    fetch("http://localhost:4000/user/setTopPick/?womenId=" + id + "&id=" + userId, {
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
      setTopPick(data.info.top_pick);
      setName(womens.at(data.info.top_pick-1)?.name);
      setSrc("/avatars/avatar-" + data.info.top_pick + ".png");
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with your fetch operation:', error);
    });
  }

  useEffect(() => {
    if(initData?.user?.username != null){
      setUserName(initData?.user?.username); 
      setLoading(true);
      // fetch("https://love-tap-back.vercel.app/user/loginUser/", {
      fetch("http://localhost:4000/user/loginUser/", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: initData?.user?.username,
          telegramId: initData?.user?.id,
          first_name: initData?.user?.firstName,
          last_name: initData?.user?.lastName
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        // Process the JSON data
        setLoading(false)
        if(data.info.userInfo.top_pick != 0) setIsFirst(false);
        else setIsFirst(true);
        setId(data.info.userInfo._id);
        setPoints(data.info.userInfo.points);
        setavatar(data.info.userInfo.avatar);
        setTopPick(data.info.userInfo.top_pick);
        setRoundId(data.info.gameStatus.activeRoundNum);
        setMatches(data.info.gameStatus.matches);
        addRoundResults(data.info.gameStatus.matches);
        setEndAt(data.info.gameStatus.endAt);
        setIsPreparing(data.info.gameStatus.isPreparing);
        setBet(data.info.bets);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your fetch operation:', error);
      });
    }
  }, [initData,setEndAt,setId,setIsFirst,setMatches,setPoints,setRoundId,setTopPick,setUserName,setavatar,setIsPreparing])



  if (topPick > 0) {
    router.push('/home');
    return null; // Return null to avoid rendering any JSX
  }

  return (
    <NextBgImage
      src={backgroundImage}
      eager
      className={`${loading?'':'pb-[40px]'} w-full min-h-screen relative`}
    >
      {loading?
      <div className="w-full h-screen flex items-center justify-center">
        <Image src={loadingImage.src} alt="Loading" width={100} height={100} />
      </div>
      :<div>
        {!isLetsgo ? (
          <Letsgo setIsLetsgo={setIsLetsgo} />
        ) : (
          <div className="flex flex-col items-center">
            { step != 3 ? <div className="w-full flex justify-center pt-2.5">
              <Stepper setStep={setStep} steps={["1", "2", "3"]} active={step} />
            </div> : 
            <div className="pt-4 pb-[26px]">
              <h1 className="text-[19px] mt-4 text-[#FCFCFC] font-bold leading-[22.99px] text-center">
                Select your TOP PICK
              </h1>
            </div> }
            {step === 0 && <FirstStep />}
            {step === 1 && <SecondStep />}
            {step === 2 && <ThirdStep handleContinue={handleContinue} />}
            {step === 3 && <SelectTopPick />}
            <div className={`${step ==3?'fixed bottom-[30px]':''} w-full px-[18px] pt-[13px]`}>
              <Button className = 'bottom-[30px]' onClick={handleContinue}>Continue</Button>
            </div>
            <AlertModal open={open} close={() => setOpen(false)} />
          </div>
        )}
        </div>
        }
      
    </NextBgImage>
  );
};
