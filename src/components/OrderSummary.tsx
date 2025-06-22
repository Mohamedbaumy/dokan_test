"use client";

interface OrderSummaryProps {
  totalAmount: string;
  invoice: string;
  seller: string;
  description: string;
  onPayment: () => void;
  isProcessing: boolean;
  isSuccess: boolean;
  showModal: boolean;
  onCloseModal: () => void;
}

export default function OrderSummary({
  totalAmount,
  invoice,
  seller,
  description,
  onPayment,
  isProcessing,
  isSuccess,
  showModal,
  onCloseModal,
}: OrderSummaryProps) {
  return (
    <>
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
              <p className="text-xs font-normal leading-[18px]">
                {description}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onPayment}
          disabled={isProcessing || isSuccess}
          className={`relative w-full h-[41px] rounded-md overflow-hidden px-3 py-4 border border-white/20 transition-all duration-200 ${
            isSuccess
              ? "bg-green-600 cursor-default"
              : isProcessing
              ? "bg-[#4A24F5]/70 cursor-not-allowed"
              : "bg-[#4A24F5] hover:bg-[#4A24F5]/90 cursor-pointer"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/0 pointer-events-none"></div>
          <span className="relative flex items-center justify-center h-full text-white font-semibold text-sm font-medium leading-5">
            {isSuccess ? (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Payment Successful!
              </div>
            ) : isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              `Pay ${totalAmount}`
            )}
          </span>
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#272727] to-[#151515] border border-white/10 rounded-xl p-6 max-w-md w-full text-center space-y-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Payment Successful!
            </h3>
            <p className="text-[#878787]">
              Your payment of {totalAmount} has been processed successfully.
            </p>
            <p className="text-sm text-[#878787]">
              Transaction ID:{" "}
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <button
              onClick={onCloseModal}
              className="w-full bg-[#4A24F5] hover:bg-[#4A24F5]/90 text-white py-2 px-4 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
