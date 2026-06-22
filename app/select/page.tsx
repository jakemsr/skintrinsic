"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";


export default function Select() {

  interface SquareProps {
    text: string;
    clickable: boolean;
    dark?: boolean;
    onClick?: React.MouseEventHandler;
  }

  const Square = ({text, clickable, dark, onClick}: SquareProps) => {
    return (
      <div
        className={`relative w-38.5 h-38.5
          ${dark ? 'bg-[#1a1b1c] text-[#fcfcfc]' : 'bg-[#F3F3F4] hover:bg-[#E1E1E2] '}
          ${clickable ? 'cursor-pointer' : 'cursor-not-allowed'}
        `}
        onClick={onClick}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 font-semibold tracking-[-2%] uppercase">
          {text}
        </div>
      </div>
    )
  }

  const handleDemographics = () => {
    router.push("/summary");
  }

  const router = useRouter();

  return (
    <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
      <NavBar code={false} location="analysis" />

      <div className="w-56.75 h-6 uppercase font-semibold text-base leading-6 tracking-[-2%] ml-8 mt-4">
        A.I. analysis
      </div>
      <div className="w-84 h-12 uppercse font-normal text-sm leading-6 ml-8 mt-2">
        A. I. has estimated the following.
        <br />
        Fix estimated information if needed.
      </div>

      <div className="absolute inset-0 w-full flex items-center justify-center">

        <div className="relative w-190.5 h-190.5">
          <img src="/testing-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_75s_linear_infinite]" />
          <img src="/testing-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
          <img src="/testing-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2 p-8 rotate-45">

            <Square text="demographics" clickable={true} onClick={handleDemographics} />

            <Square text="cosmetic concerns" clickable={false} />

            <Square text="skin type details" clickable={false} />

            <Square text="weather" clickable={false} />

          </div>
        </div>

        </div>

      </div>

      <div className="absolute left-8 bottom-8">
        <Link href="/result">
          <img src="/back.svg" alt="" />
        </Link>
      </div>

    </div>

  );
}
