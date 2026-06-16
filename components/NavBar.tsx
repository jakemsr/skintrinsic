import Link from "next/link"

export default function NavBar( {code} : {code: boolean} ) {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 bg-[#fcfcfc]">
      <div className="flex">
        <Link href="/" className="px-4 text-[#1a1b1c] font-semibold text-sm/4 uppercase">
          Skintrinsic
        </Link>
        <img src="/intro.svg" alt="" />
      </div>
      <div>
        {code && <img src="/enter-code.svg" alt="" />}
      </div>
    </div>
  );
}