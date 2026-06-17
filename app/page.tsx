import NavBar from "@/components/NavBar"
import Link from "next/link";


export default function Home() {
  return (
    <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
      <NavBar code={true} location="intro" />

      <div className="absolute inset-0 flex items-center justify-center">
      
        <div className="flex w-full items-center justify-between">

          <div className="relative w-75.25 h-150.5">
            <img src="/landing-rect-left.svg" alt="" className="w-full h-full" />
            <img src="/discover-ai.svg" alt="" className="absolute left-8 top-1/2 -translate-y-1/2" />
          </div>

          <div className="text-center font-light text-9xl leading-30 tracking-[-7%]">
            Sophisticated
            <br />
            skincare
          </div>

          <div className="relative w-75.25 h-150.5">
            <img src="/landing-rect-right.svg" alt="" className="w-full h-full" />
            <Link href="/testing">
              <img src="/take-test.svg" alt="" className="absolute right-8 top-1/2 -translate-y-1/2" />
            </Link>
          </div>

        </div>

      </div>

      <div className="absolute left-8 bottom-8 text-sm leading-6 font-normal uppercase w-79 h-18">
        Skinstric developed an A.I. that creates 
        a highly-personalised routine tailored to 
        what your skin needs.
      </div>

    </div>
  );
}
