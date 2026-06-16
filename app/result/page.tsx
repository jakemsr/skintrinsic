"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar";


export default function Testing() {


  return (
    <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
      <NavBar code={false} />

      <div className="w-56.75 h-6 uppercase font-semibold text-base leading-6 ml-8 mt-4">
        to start analysis
      </div>

      <div className="absolute inset-0 w-full flex items-center justify-between">

        <div className="relative w-130 h-120.5 ml-8">
          <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_70s_linear_infinite]" />
          <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
          <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />
          <img src="/camera-icon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img src="/camera-pointer.svg" alt="" className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-25" />
          <div className="absolute top-31 left-93 text-sm leading-6 uppercase w-42 h-12">
            Allow A.I. <br />to Scan Your Face 
          </div>
        </div>

        <div className="relative w-130 h-120.5 ml-8">
          <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_70s_linear_infinite]" />
          <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
          <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />
          <img src="/gallery-icon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img src="/gallery-pointer.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-26 translate-y-11" />
          <div className="absolute top-82 -left-5 text-sm leading-6 uppercase text-right w-42 h-12">
            Allow A.I. <br />Access Gallery
          </div>
        </div>

      </div>

      <div className="absolute left-8 bottom-8">
        <Link href="/testing">
          <img src="/back.svg" alt="" />
        </Link>
      </div>

    </div>
  );
}