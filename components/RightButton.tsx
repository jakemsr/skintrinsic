
interface RightButtonProps {
  selfHover: boolean;
  isHovered?: boolean,
  text: string;
}

const RightButton = ({ selfHover, isHovered, text }: RightButtonProps) => {
  return (
    <div className={`relative w-40 h-12 ${selfHover && 'group'}`}>
      <img
        src="polygon-right.svg"
        alt=""
        className="absolute top-1/2 -translate-y-1/2 right-4"
      />
      <img
        src="rect-outer-line.svg"
        alt=""
        className={`absolute top-1/2 -translate-y-1/2 right-0
          ${selfHover ?
            'group-hover:animate-[ping_1500ms_linear_infinite]' :
            isHovered && 'animate-ping [animation-duration:1500ms]'}
          `}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 right-14 uppercase font-semibold text-sm leading-4 tracking-[-2%]">
        {text}
      </div>
    </div >
  )
}

export default RightButton
