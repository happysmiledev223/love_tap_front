import React, { useEffect, useState, useRef } from 'react';
import './FlipClock.css';
import {gameStore} from '../../../../../../stores/store';


const Digit = ({ group, num }) => {
  const [prevNum, setPrevNum] = useState(num);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (num !== prevNum) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
        setPrevNum(num);
      }, 350);
    }
  }, [num, prevNum]);

  return (
    <div className={`digit relative ${group}`} data-num={num}>
      <span className="base">{num}</span>
      {isFlipping && (
        <>
          <div className="flap over front" data-content={prevNum}></div>
          <div className="flap over back" data-content={num}></div>
          <div className="flap under" data-content={num}></div>
        </>
      )}
      <div className='h-[2px] w-full bg-[#A559B7] absolute left-0  top-1/2' />
      <div className='absolute w-[6px] h-[6px] rounded-full bg-[#A559B7] right-[-4px] top-[33%] translate-y-1/2' />
      <div className='absolute w-[6px] h-[6px] rounded-full bg-[#A559B7]  left-[-4px] bottom-1/2 translate-y-1/2' />
    </div>
  );
};

export const FlipClock = () => {
  const [time, setTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [remainTime, setRemainTime] = useState(0);
  const endAt = gameStore((state) => state.endAt);
  const setEndAt = gameStore((state) => state.setEndAt);

  useEffect(() => {
    setRemainTime(endAt);
  }, [endAt]);

  useEffect(() => {
    const updateTime = () => {
      if (remainTime <= 0) {
        // Stop the timer when it reaches 0
        return;
      }

      // Decrease remainTime by 1000 ms
      setRemainTime(prevTime => prevTime - 1000);
      setEndAt(remainTime - 1000);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [remainTime, setEndAt]);

  return (
    <div className='flex z-[999] max-w-[200px] items-center gap-x-1' >
      <Digit group="tenday" num={String(Math.floor(Math.floor(Math.floor(remainTime / 1000) / 3600) / 24)).padStart(2,'0')[0]} />
      <Digit group="day" num={String(Math.floor(Math.floor(Math.floor(remainTime / 1000) / 3600) / 24)).padStart(2,'0')[1]} />
      <div className='text-white text-[32px] font-normal leading-[36.06px] tracking-[-0.085em] text-center'  >:</div>
      <Digit group="tenhour" num={String(Math.floor(Math.floor(remainTime / 1000) / 3600) % 24).padStart(2,'0')[0]} />
      <Digit group="hour" num={String(Math.floor(Math.floor(remainTime / 1000) / 3600) % 24).padStart(2,'0')[1]} />
      <div className='text-white text-[32px] font-normal leading-[36.06px] tracking-[-0.085em] text-center'  >:</div>
      <Digit group="tenmin" num={String(Math.floor((Math.floor(remainTime / 1000) % 3600) / 60)).padStart(2,'0')[0]} />
      <Digit group="min" num={String(Math.floor((Math.floor(remainTime / 1000) % 3600) / 60)).padStart(2,'0')[1]} />
      <div className='text-white text-[32px] font-normal leading-[36.06px] tracking-[-0.085em] text-center' >:</div>
      <Digit group="tensec" num={String(Math.floor(remainTime / 1000) % 60).padStart(2,'0')[0]} />
      <Digit group="sec" num={String(Math.floor(remainTime / 1000) % 60).padStart(2,'0')[1]} />
    </div>
  );
};

export default FlipClock;

