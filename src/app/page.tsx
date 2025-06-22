import PaymentHeader from "../components/PaymentHeader";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import CardForm from "../components/CardForm";
import OrderSummary from "../components/OrderSummary";
import PaymentFooter from "../components/PaymentFooter";
import topRight from "../assets/top_right.svg";
import bottomLeft from "../assets/bottom_left.svg";
import bottom_pattern from "../assets/bottom_pattern.svg";
import Image from "next/image";

export default function Home() {
  // Order data
  const orderData = {
    totalAmount: "$89.57",
    invoice: "#34593350",
    seller: "Dokan Tab",
    description:
      "Platform for live broadcasting solutions and content creation",
  };

  return (
    <>
      <Image
        src={topRight}
        alt="top right"
        className="absolute top-0 right-0 hidden lg:block"
      />
      <Image
        src={bottomLeft}
        alt="bottom left"
        className="absolute bottom-0 left-0 z-10 hidden lg:block"
      />
      <Image
        src={bottom_pattern}
        alt="bottom pattern"
        className="absolute bottom-0 left-0 w-full hidden lg:block"
      />
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative border-[0.92px] border-white/10 rounded-[15.41px] bg-gradient-to-b from-[#272727] to-[#151515] p-6 sm:p-8 lg:p-12 w-full max-w-[1002px] space-y-6 sm:space-y-8 z-10 overflow-hidden">
          {/* Light effect in top-right corner */}
          <div
            className="absolute top-0 -right-15 w-32 h-72 rounded-full blur-xl -translate-y-8 translate-x-8 pointer-events-none light-pulse z-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(173,216,230,0.2) 80%, transparent 100%)",
            }}
          ></div>
          {/* Light effect in bottom-left corner */}
          <div
            className="absolute bottom-0 left-0 w-16 h-16 rounded-full blur-xl translate-y-8 -translate-x-8 pointer-events-none light-pulse-delayed z-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(173,216,230,0.2) 50%, transparent 100%)",
            }}
          ></div>
          <div className="space-y-6 relative z-10">
            <PaymentHeader />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
              <div className="xl:col-span-2 space-y-[18px]">
                <PaymentMethodSelector />
                <CardForm />
              </div>
              <div className="xl:col-span-1">
                <OrderSummary
                  totalAmount={orderData.totalAmount}
                  invoice={orderData.invoice}
                  seller={orderData.seller}
                  description={orderData.description}
                />
              </div>
            </div>
          </div>
          <PaymentFooter />
        </div>
      </div>
    </>
  );
}
