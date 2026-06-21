
interface LeftButtonProps {
  selfHover: boolean;
  isHovered?: boolean;
  text: string;
  light?: boolean;
}

const LeftButton = ({ selfHover, isHovered, text, light }: LeftButtonProps) => {

  const items = {
    textColor: "#1a1b1c",
    polygon: "/polygon-left.svg",
    rectangle: "/rect-outer-line.svg"
  }

  if (light) {
    items.textColor = "#fcfcfc";
    items.polygon = "/polygon-left-light.svg";
    items.rectangle = "/rect-outer-line-light.svg";
  }

  return (
    <div className={`relative ${text ? 'w-40' : 'w-12'} h-12 ${selfHover && 'group'}`}>
      <img
        src={items.polygon}
        alt=""
        className="absolute top-1/2 -translate-y-1/2 left-4"
      />
      <img
        src={items.rectangle}
        alt=""
        className={`absolute top-1/2 -translate-y-1/2
          ${selfHover ?
            'group-hover:animate-[ping_1500ms_linear_infinite]' :
            isHovered && 'animate-ping [animation-duration:1500ms]'}
          `}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-14 text-[${items.textColor}] uppercase font-semibold text-sm leading-4 tracking-[-2%]`}
      >
        {text}
      </div>
    </div >
  )
}

export default LeftButton
