"use client";
import cards from "../assets/cards.svg";
import cvc from "../assets/cvc.svg";
import Image from "next/image";
import { useState, useCallback } from "react";

interface ValidationState {
  isValid: boolean;
  message: string;
}

interface FormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface FormErrors {
  cardholderName: ValidationState;
  cardNumber: ValidationState;
  expiryDate: ValidationState;
  cvc: ValidationState;
}

export default function CardForm() {
  const [formData, setFormData] = useState<FormData>({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    cardholderName: { isValid: true, message: "" },
    cardNumber: { isValid: true, message: "" },
    expiryDate: { isValid: true, message: "" },
    cvc: { isValid: true, message: "" },
  });

  const [touched, setTouched] = useState({
    cardholderName: false,
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  });

  const validateCardholderName = useCallback(
    (name: string): ValidationState => {
      if (!name.trim()) {
        return { isValid: false, message: "Cardholder name is required" };
      }
      if (name.trim().length < 2) {
        return {
          isValid: false,
          message: "Name must be at least 2 characters",
        };
      }
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        return {
          isValid: false,
          message: "Name can only contain letters and spaces",
        };
      }
      return { isValid: true, message: "" };
    },
    []
  );

  const validateCardNumber = useCallback(
    (cardNumber: string): ValidationState => {
      const cleanNumber = cardNumber.replace(/\s/g, "");

      if (!cleanNumber) {
        return { isValid: false, message: "Card number is required" };
      }

      if (!/^\d+$/.test(cleanNumber)) {
        return {
          isValid: false,
          message: "Card number can only contain digits",
        };
      }

      if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        return { isValid: false, message: "Card number must be 13-19 digits" };
      }

      const luhnCheck = (num: string) => {
        let sum = 0;
        let isEven = false;

        for (let i = num.length - 1; i >= 0; i--) {
          let digit = parseInt(num[i]);

          if (isEven) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }

          sum += digit;
          isEven = !isEven;
        }

        return sum % 10 === 0;
      };

      if (!luhnCheck(cleanNumber)) {
        return { isValid: false, message: "Invalid card number" };
      }

      return { isValid: true, message: "" };
    },
    []
  );

  const validateExpiryDate = useCallback((expiry: string): ValidationState => {
    if (!expiry) {
      return { isValid: false, message: "Expiry date is required" };
    }

    const cleanExpiry = expiry.replace(/\s/g, "");
    if (!/^\d{2}\/\d{2}$/.test(cleanExpiry)) {
      return { isValid: false, message: "Format must be MM/YY" };
    }

    const [month, year] = cleanExpiry.split("/").map(Number);

    if (month < 1 || month > 12) {
      return { isValid: false, message: "Invalid month" };
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { isValid: false, message: "Card has expired" };
    }

    return { isValid: true, message: "" };
  }, []);

  const validateCVC = useCallback((cvc: string): ValidationState => {
    if (!cvc) {
      return { isValid: false, message: "CVC is required" };
    }

    if (!/^\d{3,4}$/.test(cvc)) {
      return { isValid: false, message: "CVC must be 3-4 digits" };
    }

    return { isValid: true, message: "" };
  }, []);

  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s/g, "");
    const formattedValue = cleanValue.replace(/(.{4})/g, "$1 ").trim();
    return formattedValue;
  };

  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length >= 2) {
      return cleanValue.slice(0, 2) + "/" + cleanValue.slice(2, 4);
    }
    return cleanValue;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 19) return;
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.replace(/\D/g, "").length > 4) return;
    } else if (field === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    let validation: ValidationState;
    switch (field) {
      case "cardholderName":
        validation = validateCardholderName(formattedValue);
        break;
      case "cardNumber":
        validation = validateCardNumber(formattedValue);
        break;
      case "expiryDate":
        validation = validateExpiryDate(formattedValue);
        break;
      case "cvc":
        validation = validateCVC(formattedValue);
        break;
      default:
        validation = { isValid: true, message: "" };
    }

    setErrors((prev) => ({ ...prev, [field]: validation }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getInputClassName = (field: keyof FormData, baseClassName: string) => {
    const hasError = touched[field] && !errors[field].isValid;

    let borderColor = "border-[#383838]";
    if (hasError) {
      borderColor = "border-red-500";
    }

    return `${baseClassName} ${borderColor}`;
  };

  return (
    <div className="bg-white/3 border-[0.5px] border-[#444444] rounded-lg p-3 sm:p-4">
      <div className="space-y-4 sm:space-y-[18px]">
        <h3 className="text-base font-medium leading-6">Payment Method</h3>
        <div className="space-y-3 sm:space-y-[14px]">
          <div className="space-y-[6px]">
            <label className="block text-[14px] font-medium leading-5">
              Cardholder name
            </label>
            <input
              type="text"
              placeholder="Full name on card"
              value={formData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              onBlur={() => handleBlur("cardholderName")}
              className={getInputClassName(
                "cardholderName",
                "w-full bg-[#2F2F2F] border rounded-md h-[34px] py-[9px] px-[15px] placeholder:text-[#878787] placeholder:text-[14px] placeholder:font-normal placeholder:leading-5 focus:outline-none text-sm"
              )}
            />
            {touched.cardholderName && !errors.cardholderName.isValid && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cardholderName.message}
              </p>
            )}
          </div>

          <div className="space-y-[6px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <label className="block text-[14px] font-medium leading-5">
                Card information
              </label>
              {touched.cardNumber && !errors.cardNumber.isValid && (
                <p className="text-red-500 text-xs">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  onBlur={() => handleBlur("cardNumber")}
                  className={getInputClassName(
                    "cardNumber",
                    "w-full bg-[#2F2F2F] border rounded-t-md h-[34px] py-[9px] px-[15px] pr-12 placeholder:text-[#878787] placeholder:text-[14px] placeholder:font-normal placeholder:leading-5 focus:outline-none text-sm"
                  )}
                />
                <Image
                  src={cards}
                  alt="cards"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-auto h-auto"
                />
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    onBlur={() => handleBlur("expiryDate")}
                    className={getInputClassName(
                      "expiryDate",
                      "w-full bg-[#2F2F2F] border rounded-bl-md h-[34px] py-[9px] px-[15px] placeholder:text-[#878787] placeholder:text-[14px] placeholder:font-normal placeholder:leading-5 focus:outline-none text-sm"
                    )}
                  />
                  {touched.expiryDate && !errors.expiryDate.isValid && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={(e) => handleInputChange("cvc", e.target.value)}
                      onBlur={() => handleBlur("cvc")}
                      className={getInputClassName(
                        "cvc",
                        "w-full bg-[#2F2F2F] border rounded-br-md h-[34px] py-[9px] px-[15px] pr-10 placeholder:text-[#878787] placeholder:text-[14px] placeholder:font-normal placeholder:leading-5 focus:outline-none text-sm"
                      )}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Image src={cvc} alt="cvc" className="w-auto h-auto" />
                    </div>
                  </div>
                  {touched.cvc && !errors.cvc.isValid && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cvc.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
