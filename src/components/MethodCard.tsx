import Image from "next/image";

const MethodCard = ({
  img,
  label,
  isSelected,
  onClick,
}: {
  img: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button className="space-y-2 cursor-pointer w-full" onClick={onClick}>
      <div
        className={`border rounded-md p-1 ${
          isSelected
            ? "border-[#9F98FF] border-[1px]"
            : "border-[#606060] border-[0.7px]"
        }`}
      >
        <div className="bg-[#464646] rounded-sm flex items-center justify-center h-12 sm:h-16 lg:h-18">
          <Image
            src={img}
            alt={label}
            className="w-auto h-auto max-w-full max-h-full"
          />
        </div>
      </div>
      <span className="text-xs font-normal mt-2 sm:mt-3 block text-center truncate">
        {label}
      </span>
    </button>
  );
};

export default MethodCard;
