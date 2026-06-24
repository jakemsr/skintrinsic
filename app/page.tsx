"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar"
import LeftButton from "@/components/LeftButton";
import RightButton from "@/components/RightButton";


export default function Home() {

  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);


  return (
    <div className="relative flex flex-col h-dvh max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">

      <NavBar code={true} location="intro" />

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative flex w-full items-start -translate-y-30 xl:items-center xl:translate-y-0 justify-between">

          <div className={`hidden xl:block relative w-75.25 h-150.5 transition-opacity duration-500 ${isHoveredRight && 'opacity-0'}`}>
            <div className="relative w-screen h-screen">
              <img
                src="/testing-inner-rect.svg"
                alt=""
                className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
              <img
                src="/testing-mid-rect.svg"
                alt=""
                className={`absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity
                  ${isHoveredLeft ? 'opacity-100 duration-750' : 'opacity-0 duration-1500'}
                  `}
              />
              <img
                src="/testing-outer-rect.svg"
                alt=""
                className={`absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity
                  ${isHoveredLeft ? 'opacity-100 duration-1500' : 'opacity-0 duration-750'}
                  `}
              />
            </div>
            <div
              className="absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer"
              onMouseEnter={() => setIsHoveredLeft(true)}
              onMouseLeave={() => setIsHoveredLeft(false)}
            >
              <LeftButton selfHover={false} isHovered={isHoveredLeft} text="discover a.i." />
            </div>
          </div>


          <div
            className={`absolute flex items-center justify-center font-light text-5xl leading-12 xl:text-[120px] xl:leading-30 tracking-[-7%] -translate-y-1/2 transition-all duration-1000 ease-in-out
              ${isHoveredRight ? 'left-8' :
                isHoveredLeft ? 'left-full -translate-x-full -ml-8' :
                  'left-1/2 -translate-x-1/2'}              
            `}
          >
            <span className={`transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              Sophisticated
            </span>
          </div>

          <div
            className={`absolute flex items-center justify-center font-light text-5xl leading-12 xl:text-[120px] xl:leading-30 tracking-[-7%] translate-y-1/2 transition-all duration-1000 ease-in-out
              ${isHoveredRight ? 'left-8' :
                isHoveredLeft ? 'left-full -translate-x-full -ml-8' :
                  'left-1/2 -translate-x-1/2'}
            `}
          >
            <span className={`transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              skincare
            </span>
          </div>


          <div className={`hidden xl:block relative w-75.25 h-150.5 transition-opacity duration-500 ${isHoveredLeft && 'opacity-0'}`}>
            <div className="relative w-screen h-screen">
              <img
                src="/testing-inner-rect.svg"
                alt=""
                className="absolute top-1/2 -translate-y-1/2"
              />
              <img
                src="/testing-mid-rect.svg"
                alt=""
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-10 transition-opacity
                  ${isHoveredRight ? 'opacity-100 duration-750' : 'opacity-0 duration-1500'}
                  `}
              />
              <img
                src="/testing-outer-rect.svg"
                alt=""
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-20 transition-opacity
                  ${isHoveredRight ? 'opacity-100 duration-1500' : 'opacity-0 duration-750'}
                  `}
              />
            </div>
            <Link
              href="/testing"
              onMouseEnter={() => setIsHoveredRight(true)}
              onMouseLeave={() => setIsHoveredRight(false)}
              className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <RightButton selfHover={false} isHovered={isHoveredRight} text="take test" />
            </Link>
          </div>

        </div>

      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-24 text-center xl:left-8 xl:bottom-8 xl:translate-x-0 xl:text-left text-sm leading-6 font-normal uppercase w-79 xl:w-79 h-18">
        Skinstric developed an A.I. that creates
        a highly-personalised routine tailored to
        what your skin needs.
      </div>

      <div className="absolute right-8 bottom-8 xl:hidden">
        <Link href="/testing">
          <RightButton selfHover={true} text="take test" />
        </Link>
      </div>

    </div>
  );
}
