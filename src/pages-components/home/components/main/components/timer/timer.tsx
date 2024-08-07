import React, { useEffect } from 'react'
import { DollorIcon } from '@/icons'
import styles from './timer.module.css'
import { Props } from './types'
import './timer.css'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { FlipClock } from './FlipClock'
import {userStore} from '../../../../../../stores/store'

const PointSection = () => {
  const points = userStore((state) => state.points)

  return <div className='flex mt-[6px] py-[7px] justify-between items-center'>
  <div>
    <FlipClock />
  </div>
  <div className='flex gap-x-1 items-center'>
    <div className='w-[14px] h-[14px] rounded-full flex justify-center items-center bg-[#FFBD3D]'>
      <DollorIcon className='w-[3.87px]  h-[7.47px]' />
    </div>
    <p className='text-sm font-normal leading-[21px] text-white tracking-[0.36000001430511475px]'>
      Points: <span className='font-[600]'>{points}</span>
    </p>
  </div>
</div>
}

export const Timer = ({ type }: Props) => {
  
  return (
    <div
      className={`${styles.bg} mt-[12px] w-full py-[7px]  px-[15px] rounded-[8px]`}
    >
      <p className='text-xs font-normal leading-[14.4px] tracking-[-0.40799999237060547px]  text-left text-[#FCFCFC]'>
        { type == "start" ? `Start of round in:` : ( type == "Result" ? `The Result will be shown in` : `End of round in:`) } 
      </p>
      <PointSection />
    </div>
  )
}

