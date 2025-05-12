"use client";

import React from "react";
import { useState } from "react";
import chroma from "chroma-js";
import ColorPalete from "./components/colorPalette/colorPalette";

export default function Home() {
  const [myColor, setMyColor] = useState("#000000");
  const randomPalette = chroma.scale([chroma.random(), chroma.random()]).mode("lab").colors(5);
  const [palette, setPalette] = useState(randomPalette);
  const [isLocked, setIsLocked] = useState(false);

  console.log(myColor);

  const generateColors = () => {
    const randomPalette = chroma.scale([chroma.random(), chroma.random()]).mode("lab").colors(5);
    setPalette(randomPalette);
    console.log("Generated palette:", randomPalette);
  };

  const getContrastColor = (bgColor: string) => {
    const r = parseInt(bgColor.substring(1, 3), 16);
    const g = parseInt(bgColor.substring(3, 5), 16);
    const b = parseInt(bgColor.substring(5, 7), 16);
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return luminance > 0.5 ? "#081f5c" : "#FFFFFF";
  };

  const updateColor = (index: number, newColor: string) => {
    console.log(`Updating palette at index ${index} to ${newColor}`);
    setPalette((prevPalette) => {
      const newPalette = [...prevPalette];
      newPalette[index] = newColor;
      return newPalette;
    });
    setMyColor(newColor);
  };

  const updateLockState = (index: number, newstate: boolean) => {
    console.log(`updating at index ${index} with islopcked value as ${isLocked}`);
    setIsLocked(!newstate);

    return !isLocked;
  };

  return (
    <>
      <div className="bg-[#d0e3ff] text-[#081f5c] h-screen flex flex-col">
        <h1 className="text-center text-4xl font-bold py-7 border-b-[.5px] border-[#081f5c]/30">
          Color Palette Generator
        </h1>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 border-r-[.5px] border-[#081f5c]/30 px-[2rem] pb-[7rem]">
            <h1 className="text-center text-2xl mt-5">Create a Palette</h1>
            <div className="h-full flex flex-col shadow-2xl p-3">
              <div
                onClick={() => console.log("Palette container clicked")}
                className="flex justify-between text-center text-white flex-1 rounded-2xl p-2">
                {palette.map((color, index) => (
                  <div key={index} className="">
                    <ColorPalete
                      genColor={color}
                      setIsLocked={(newstate: boolean) => updateLockState(index, newstate)}
                      setNewColor={(newColor: string) => updateColor(index, newColor)}
                      index={index}
                    />
                  </div>
                ))}
              </div>
              <h2
                onClick={generateColors}
                className="text-center text-xl text-white bg-[#334eac] font-bold cursor-pointer rounded-md mx-auto w-full p-4 mt-6 shadow-md hover:shadow-lg">
                Generate a Color Palette
              </h2>
            </div>
          </div>
          <div className="px-[2rem]">
            <h1 className="text-center text-2xl mt-5">Mock UI Preview</h1>
            <div className="mt-5 p-6 shadow-2xl flex flex-col">
              <div
                className="flex items-center w-full p-4 justify-between text-white rounded-lg shadow-md"
                style={{ background: palette[0], color: getContrastColor(palette[0]) }}>
                <h1 className="text-center text-2xl font-semibold">Header</h1>
                <div className="flex items-center justify-center gap-6 no-underline">
                  <a className="hover:text-gray-200 transition-colors">Home</a>
                  <a className="hover:text-gray-200 transition-colors">About</a>
                  <a className="hover:text-gray-200 transition-colors">Contact</a>
                </div>
              </div>
              <div
                className="flex-grow p-5 mt-4 rounded-lg shadow-md flex flex-col justify-center text-center h-56"
                style={{ background: palette[1], color: getContrastColor(palette[1]) }}>
                <h2 className="text-center text-4xl font-bold">Welcome</h2>
                <p className="mt-2 text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, autem.
                </p>
                <div
                  className="p-3 w-fit rounded-md text-md mx-auto mt-4 hover:cursor-pointer transition-colors shadow-sm"
                  style={{
                    background: palette[3],
                    color: getContrastColor(palette[3]),
                  }}>
                  Get started
                </div>
              </div>
              <div
                className="p-6 rounded-lg mt-4 shadow-md"
                style={{
                  background: palette[3],
                  color: getContrastColor(palette[3]),
                }}>
                <h1 className="font-bold text-xl">Featured Content</h1>
                <p className="my-2">
                  This is a sample card to showcase how the colors work together in a UI component.
                </p>
                <span
                  className="p-2 w-fit rounded-md mx-auto shadow-sm mt-[4rem] hover:cursor-pointer "
                  style={{ background: palette[4], color: getContrastColor(palette[4]) }}>
                  Learn more
                </span>
              </div>
              <div
                className=" mt-4 p-2 text-center rounded-lg shadow-md"
                style={{ background: palette[4], color: getContrastColor(palette[4]) }}>
                <p>
                  © 2025 Your app. All rights reserved.{" "}
                  <span className="underline">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
