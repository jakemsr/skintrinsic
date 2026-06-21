import Link from "next/link";

interface NavBarProps {
  code: boolean;
  location: string;
  light?: boolean;
}

export default function NavBar({ code, location, light }: NavBarProps) {
 
   const items = {
    textColor: "#1a1b1c",
    leftBracket: "/header-bracket-left.svg",
    rightBracket: "/header-bracket-right.svg"
  }

  if (light) {
    items.textColor = "#fcfcfc";
    items.leftBracket = "/header-bracket-left-light.svg";
    items.rightBracket = "/header-bracket-right-light.svg";
  }

 
  return (
    <div className={`flex items-center justify-between w-full h-16 px-4 bg-transparent text-[${items.textColor}] z-100`}>
      <div className="flex items-center">
        <Link href="/">
          <div className="px-4 font-semibold text-sm/4 uppercase">
            Skintrinsic
          </div>
        </Link>
        <div className="flex items-center justify-left w-41 h-5 opacity-60">
          <img src={items.leftBracket} alt="" />
          <div className="mx-1.5 w-fit h-4 font-semibold text-sm leading-4 tracking-[-2%] uppercase">
            {location}
          </div>
          <img src={items.rightBracket} alt="" />
        </div>
      </div>
      <div>
        {code && <img src="/enter-code.svg" alt="" />}
      </div>
    </div>
  );
}