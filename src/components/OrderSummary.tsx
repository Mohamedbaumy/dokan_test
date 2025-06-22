interface OrderSummaryProps {
  totalAmount: string;
  invoice: string;
  seller: string;
  description: string;
}

export default function OrderSummary({
  totalAmount,
  invoice,
  seller,
  description,
}: OrderSummaryProps) {
  return (
    <div className="h-full flex flex-col gap-3 sm:gap-4">
      <div className="bg-white/3 border-[0.5px] border-[#444444] rounded-xl p-3 sm:p-4 backdrop-blur-xs space-y-3 sm:space-y-[14px] flex-1">
        <div className="space-y-3 sm:space-y-4 pb-3 sm:pb-[14px] border-b border-[#383838] text-center">
          <p className="text-sm sm:text-base font-medium leading-6">
            Total Amount
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[44px] tracking-[-0.02em] bg-gradient-to-r from-[#7066FF] to-[#BAB6FF] bg-clip-text text-transparent">
            {totalAmount}
          </p>
        </div>

        <h4 className="text-sm font-medium leading-5">Order Summary</h4>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-start">
            <span className="text-[#878787] text-sm font-medium leading-5">
              Invoice
            </span>
            <span className="text-xs font-normal leading-[18px] text-right">
              {invoice}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[#878787] text-sm font-medium leading-5">
              Seller
            </span>
            <span className="text-xs font-normal leading-[18px] text-right">
              {seller}
            </span>
          </div>

          <div className="space-y-2 sm:space-y-[10px]">
            <h5 className="text-[#878787] text-sm font-medium leading-5">
              Seller Description:
            </h5>
            <p className="text-xs font-normal leading-[18px]">{description}</p>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[41px] rounded-md overflow-hidden bg-[#4A24F5] px-3 py-4 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/0 pointer-events-none"></div>
        <span className="relative flex items-center justify-center h-full text-white font-semibold text-sm font-medium leading-5">
          Pay {totalAmount}
        </span>
      </div>
    </div>
  );
}
