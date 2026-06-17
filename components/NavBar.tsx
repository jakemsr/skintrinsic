import Link from "next/link";

interface NavBarProps {
  code: boolean;
  location: string;
}

export default function NavBar({ code, location }: NavBarProps) {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 bg-transparent text-[#1a1b1c] z-100">
      <div className="flex items-center">
        <Link href="/">
          <div className="px-4 font-semibold text-sm/4 uppercase">
            Skintrinsic
          </div>
        </Link>
        <div className="flex items-center justify-left w-41 h-5 opacity-60">
          <img src="/header-bracket-left.svg" alt="" />
          <div className="mx-1.5 w-fit h-4 font-semibold text-sm leading-4 tracking-[-2%] uppercase">
            {location}
          </div>
          <img src="/header-bracket-right.svg" alt="" />
        </div>
      </div>
      <div>
        {code && <img src="/enter-code.svg" alt="" />}
      </div>
    </div>
  );
}