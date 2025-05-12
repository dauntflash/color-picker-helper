"use client";

import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ColorPaleteProps {
  genColor: string;
  setNewColor: (color: string) => void;
  index: number;
  setIsLocked: (isLocked: boolean) => void;
}

function ColorPalete({ genColor, setNewColor, index,  setIsLocked }: ColorPaleteProps) {
  const colorRef = useRef<HTMLInputElement>(null);
  const [myColor, setMyColor] = useState(genColor);
  const [lockState, setLockState] = useState(false)

  // Sync myColor with genColor when genColor changes
  useEffect(() => {
    setMyColor(genColor);
  }, [genColor, index]);

  const getContrastColor = (bgColor: string) => {
    const r = parseInt(bgColor.substring(1, 3), 16);
    const g = parseInt(bgColor.substring(3, 5), 16);
    const b = parseInt(bgColor.substring(5, 7), 16);
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return luminance > 0.5 ? "#081f5c" : "#FFFFFF";
  };

  const [textColor, setTextColor] = useState(getContrastColor(myColor));

  const handleClick = () => {
    if (!lockState){
       if (colorRef.current) {
      colorRef.current.click();
    }
    }
   
  };
  const handleLock = () => {
    setLockState((prev)=>!prev)
    setIsLocked(lockState);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(myColor);
    toast.success("Color copied to clipboard", {
      position: "bottom-center",
      duration: 2000,
    });
  };

  return (
    <div className="h-full flex relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={handleClick}
              style={{ background: myColor, color: getContrastColor(myColor) }}
              className="flex flex-col items-center justify-center text-center rounded-[15px] cursor-pointer h-full shadow-md">
              <span className="text-center mx-auto w-[8rem]">{myColor}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            style={{
              background: textColor,
              color: textColor === "#FFFFFF" ? "#081f5c" : "#FFFFFF",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${textColor === "#FFFFFF" ? "#DDD" : "#444"}`,
            }}>
            <p>Click to change color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span
        style={{ color: getContrastColor(myColor) }}
        className="fa-regular fa-copy text-2xl hover:cursor-pointer p-4 w-max h-max absolute bottom-[30%] left-[20%]"
        onClick={handleCopy}></span>
      {lockState && (
        <span
          style={{ color: getContrastColor(myColor) }}
          className="fa fa-lock text-2xl hover:cursor-pointer p-4 w-max h-max absolute bottom-[20%] left-[20%]"
          onClick={handleLock}></span>
      )}
      
      {!lockState && (
        <span
          style={{ color: getContrastColor(myColor) }}
          className="fa fa-lock-open text-2xl hover:cursor-pointer p-4 w-max h-max absolute bottom-[20%] left-[20%]"
          onClick={handleLock}></span>
      )}
      <span>
        <input
          type="color"
          ref={colorRef}
          value={myColor}
          onChange={(e) => {
            console.log("Color changed:", e.target.value);
            const newColor = e.target.value;
            setMyColor(newColor);
            setTextColor(getContrastColor(newColor));
            setNewColor(newColor);
          }}
          className="absolute opacity-0 w-0 h-0"
        />
      </span>
    </div>
  );
}

export default ColorPalete;
