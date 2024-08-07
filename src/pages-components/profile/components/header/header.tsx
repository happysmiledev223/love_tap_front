"use client";
import { PenEditIcon } from "@/icons/pen";
import Image from "next/image";
import styles from "./header.module.css";
import { useRef, useState } from "react";
import { userStore } from "@/stores/store";
export const Header = () => {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const username = userStore((state) => state.username);
  const avatar = userStore((state) => state.avatar);
  const EdiPen = () => {
    inputRef?.current?.click();
  };
  const handleFileChange = (event : any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const dataUrl = event.target.result?.toString();
    reader.onload = function(event) {
        console.log(reader.result);
        // const base64String = dataUrl.split(',')[1] || '';
        // console.log(base64String); // Base64 encoded string
    };

    if (file) {
      console.log(file);
      reader.readAsDataURL(file);
    }
};
  return (
    <div className="w-full flex flex-col items-center justify-center pt-[21px] ">
      <div className="w-20 h-20 relative bg-white  rounded-full">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={`data:image/jpeg;base64,${avatar}`}
            alt="profile_name"
            width={80}
            height={80}
            className="rounded-full"
          />
          <input
            id="input"
            type="file"
            onChange={(e: any) => handleFileChange(e)}
            hidden
          />
        </div>
        <label
          htmlFor="input"
          onClick={EdiPen}
          className={`${styles.edit_button_bg}  right-1 -bottom-1 rounded-full p-[7.5px] absolute`}
        >
          <PenEditIcon className="w-[12px] h-[13px] text-white" />
        </label>
      </div>
      <h1 className="text-lg font-medium text-[#FCFCFC] mt-4 leading-[21.6px] tracking-[0.3799999952316284px] text-center">
        {username}
      </h1>
    </div>
  );
};
