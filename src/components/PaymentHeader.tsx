import logo from "../assets/logo.svg";
import Image from "next/image";

export default function PaymentHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-b from-[#FFFFFF] to-[#6D6D6D] bg-clip-text text-transparent mb-2">
          Payment Details
        </h1>
        <p className="text-[#EDEDED] text-sm sm:text-base font-normal">
          Complete your purchase by providing your payment details
        </p>
      </div>
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
        <Image src={logo} alt="logo" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
