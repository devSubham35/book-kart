"use client";

import { useState } from "react";
import PriceInfoForm from "./PriceInfoForm";
import { Progress } from "@/components/ui/progress";
import SellingBookInfoForm from "./SellingBookInfoForm";

export interface SellerBookInformationFormData {
  book_title: string;
  book_author: string;
  book_images?: string[];
  book_category?: string;
  book_condition: string;
  book_description?: string;
}

export interface SellerBookPriceFormData {
  book_price: number;
  discount_enabled?: boolean;
  discount_type?: string;
  discount_price?: number;
  shipping_free?: boolean;
  shipping_charges?: number;
  additional_book_information?: string;
}

export interface CombinedFormData extends SellerBookInformationFormData, SellerBookPriceFormData { }

export default function SellerFormStepper() {

  const [step, setStep] = useState(1);
  const [combinedFormData, setCombinedFormData] = useState<Partial<CombinedFormData>>({});

  const handleNext = (data: SellerBookInformationFormData) => {
    setCombinedFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = (data: Partial<SellerBookPriceFormData>) => {
    setStep((prev) => prev - 1);
    setCombinedFormData((prev) => ({ ...prev, ...data }));
  };

  const handleFinalSubmit = (data: SellerBookPriceFormData) => {
    const finalData = { ...combinedFormData, ...data };
    setCombinedFormData(finalData);
    console.log("Final Form Data ++66", finalData);
    // Here you can submit to your API or perform other actions
  };

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      {/* Stepper progress */}
      <Progress value={step === 1 ? 50 : 100} className="w-full sticky top-0 bg-background z-10" />

      {/* Step Forms */}
      {step === 1 && (
        <SellingBookInfoForm
          handleFormSubmit={handleNext}
          initialValues={combinedFormData as SellerBookInformationFormData}
        />
      )}
      {step === 2 && (
        <PriceInfoForm
          onBackClick={handleBack}
          handleFormSubmit={handleFinalSubmit}
          initialValues={combinedFormData as SellerBookPriceFormData}
        />
      )}
    </div>
  );
}