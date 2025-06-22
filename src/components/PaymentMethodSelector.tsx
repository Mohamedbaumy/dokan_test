"use client";

import { useState } from "react";
import card from "../assets/card.svg";
import apple from "../assets/apple_pay.svg";
import google from "../assets/google_pay.svg";
import stc from "../assets/stc_pay.svg";
import MethodCard from "./MethodCard";

export default function PaymentMethodSelector() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "card", label: "Card", img: card, isSelected: true },
    { id: "apple", label: "Apple Pay", img: apple, isSelected: false },
    { id: "google", label: "Google Pay", img: google, isSelected: false },
    { id: "stc", label: "STC Pay", img: stc, isSelected: false },
  ]);

  const handleMethodClick = (clickedId: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isSelected: method.id === clickedId,
      }))
    );
  };

  return (
    <div className="border border-[#444444] border-[0.5px] rounded-lg bg-[#2C2C2C] p-3 sm:p-4">
      <h3 className="text-[#D6D6D6] text-base font-medium mb-3 sm:mb-4">
        Payment Method
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-x-2">
        {paymentMethods.map((method) => (
          <MethodCard
            key={method.id}
            img={method.img}
            label={method.label}
            isSelected={method.isSelected}
            onClick={() => handleMethodClick(method.id)}
          />
        ))}
      </div>
    </div>
  );
}
