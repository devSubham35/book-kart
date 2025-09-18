"use client";

import * as z from "zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schema
const priceSchema = z.object({
  book_price: z.number({ message: "Price is required" }).min(1, "Price must be greater than 0"),
  discount_enabled: z.boolean(),
  discount_type: z.string().optional(),
  discount_price: z.number().optional(),
  shipping_free: z.boolean(),
  shipping_charges: z.number().optional(),
  additional_book_information: z.string().optional(),
}).refine((data) => {
  if (data.discount_enabled) {
    return data.discount_type && data.discount_price !== undefined;
  }
  return true;
}, {
  message: "Discount type and amount required when discount is enabled",
  path: ["discount_price"],
});

type PriceFormValues = z.infer<typeof priceSchema>;

export interface SellerBookPriceFormData {
  book_price: number;
  discount_enabled?: boolean;
  discount_type?: string;
  discount_price?: number;
  shipping_free?: boolean;
  shipping_charges?: number;
  additional_book_information?: string;
}

interface PriceInfoFormProps {
  onBackClick?: (data: Partial<PriceFormValues>) => void;
  handleFormSubmit: (data: SellerBookPriceFormData) => void;
  initialValues?: Partial<PriceFormValues>;
  onDataChange?: (data: SellerBookPriceFormData) => void; // <-- Added
}

export default function PriceInfoForm({ 
  onBackClick, 
  handleFormSubmit, 
  initialValues,
  onDataChange 
}: PriceInfoFormProps) {
  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      book_price: initialValues?.book_price || undefined,
      discount_enabled: initialValues?.discount_enabled || false,
      discount_type: initialValues?.discount_type || "",
      discount_price: initialValues?.discount_price || undefined,
      shipping_free: initialValues?.shipping_free || false,
      shipping_charges: initialValues?.shipping_charges || undefined,
      additional_book_information: initialValues?.additional_book_information || "",
    },
  });

  const { handleSubmit, watch, setValue, control, reset, formState: { errors }, getValues } = form;

  // Sync when initialValues change
  useEffect(() => {
    if (initialValues) {
      reset({
        book_price: initialValues.book_price || undefined,
        discount_enabled: initialValues.discount_enabled || false,
        discount_type: initialValues.discount_type || "",
        discount_price: initialValues.discount_price || undefined,
        shipping_free: initialValues.shipping_free || false,
        shipping_charges: initialValues.shipping_charges || undefined,
        additional_book_information: initialValues.additional_book_information || "",
      });
    }
  }, [initialValues, reset]);

  // Watch all fields and notify parent for persistence
  const allValues = watch();
  useEffect(() => {
    if (onDataChange && allValues.book_price) {
      const currentData = getValues();
      onDataChange({
        book_price: currentData.book_price,
        discount_enabled: currentData.discount_enabled,
        discount_type: currentData.discount_type,
        discount_price: currentData.discount_price,
        shipping_free: currentData.shipping_free,
        shipping_charges: currentData.shipping_charges,
        additional_book_information: currentData.additional_book_information,
      });
    }
  }, [allValues, getValues, onDataChange]);

  const watchDiscount = watch("discount_enabled");
  const watchFreeShipping = watch("shipping_free");
  const bookPrice = watch("book_price") || 0;
  const discountPrice = watch("discount_price") || 0;

  const finalPrice =
    watchDiscount && discountPrice
      ? bookPrice - (watch("discount_type") === "percentage" ? (bookPrice * discountPrice) / 100 : discountPrice)
      : bookPrice;

  // Auto-set shipping charges to 0 if free shipping
  if (watchFreeShipping && watch("shipping_charges") !== 0) {
    setValue("shipping_charges", 0);
  }

  const onSubmit = (data: PriceFormValues) => {
    handleFormSubmit({
      book_price: data.book_price,
      discount_enabled: data.discount_enabled,
      discount_type: data.discount_type,
      discount_price: data.discount_price,
      shipping_free: data.shipping_free,
      shipping_charges: data.shipping_charges,
      additional_book_information: data.additional_book_information,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Price */}
        <FormField
          control={control}
          name="book_price"
          render={({ field }) => (
            <FormItem>
              <Label>Price</Label>
              <Input
                {...field}
                type="number"
                placeholder="Enter price"
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
              <FormMessage>{errors.book_price?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Discount Toggle */}
        <FormField
          control={control}
          name="discount_enabled"
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <FormItem className="flex items-center gap-2">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                <Label className="mt-2">Add Discount</Label>
                <FormMessage>{errors.discount_price?.message}</FormMessage>
              </FormItem>

              <p className="text-sm">
                Final Price: <b>₹{finalPrice}</b>
              </p>
            </div>
          )}
        />

        {/* Discount Fields */}
        {watchDiscount && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="discount_type"
              render={({ field }) => (
                <FormItem>
                  <Label>Discount Type</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{errors.discount_type?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="discount_price"
              render={({ field }) => (
                <FormItem>
                  <Label>Discount Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter discount"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage>{errors.discount_price?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Shipping */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label>Shipping Charges</Label>
            <FormField
              control={control}
              name="shipping_free"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <Label className="mt-2">Free Shipping</Label>
                </FormItem>
              )}
            />
          </div>
          {!watchFreeShipping && (
            <FormField
              control={control}
              name="shipping_charges"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="number"
                    placeholder="Enter shipping cost"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage>{errors.shipping_charges?.message}</FormMessage>
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Additional Info */}
        <FormField
          control={control}
          name="additional_book_information"
          render={({ field }) => (
            <FormItem>
              <Label>Additional Information</Label>
              <Textarea placeholder="Any additional info" {...field} />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-2">
          <Button onClick={()=>onBackClick?.(allValues)} variant="outline" type="button">Back</Button>
          <Button type="submit">Add Book</Button>
        </div>
      </form>
    </FormProvider>
  );
}
