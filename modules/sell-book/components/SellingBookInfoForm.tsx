"use client";

import * as z from "zod";
import { useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

export enum BOOK_CONDITION_TYPE {
  New = "New",
  Good = "Good",
  Fair = "Fair",
}

/// Zod schema
const sellingBookSchema = z.object({
  book_title: z.string().min(1, "Book title is required"),
  book_author: z.string().min(1, "Author is required"),
  book_category: z.string().min(1, "Category is required"),
  book_condition: z.string().min(1, "Book condition is required"),
  book_description: z.string().min(1, "Description is required"),
  book_images: z.array(z.string()).min(1, "Upload at least one image"),
});

type FormValues = z.infer<typeof sellingBookSchema>;

interface SellingBookInfoFormProps {
  handleFormSubmit?: (data: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

const textFields: Array<keyof Omit<FormValues, "book_condition" | "book_images">> = [
  "book_title",
  "book_author",
  "book_category",
];

export default function SellingBookInfoForm({ 
  handleFormSubmit, 
  initialValues 
}: SellingBookInfoFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(sellingBookSchema),
    defaultValues: {
      book_title: initialValues?.book_title || "",
      book_author: initialValues?.book_author || "",
      book_category: initialValues?.book_category || "",
      book_condition: initialValues?.book_condition || "",
      book_description: initialValues?.book_description || "",
      book_images: initialValues?.book_images || [],
    },
  });

  const { control, watch, setValue, handleSubmit, reset, formState: { errors } } = form;
  const watchCondition = watch("book_condition");

  // Update form when initialValues change
  useEffect(() => {
    if (initialValues) {
      reset({
        book_title: initialValues.book_title || "",
        book_author: initialValues.book_author || "",
        book_category: initialValues.book_category || "",
        book_condition: initialValues.book_condition || "",
        book_description: initialValues.book_description || "",
        book_images: initialValues.book_images || [],
      });
    }
  }, [initialValues, reset]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    handleFormSubmit?.(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {textFields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <Label className="capitalize">{fieldName.replace("_", " ")}</Label>
                {fieldName === "book_description" ? (
                  <Textarea {...field} placeholder={`Enter ${fieldName.replace("_", " ")}`} />
                ) : (
                  <Input {...field} placeholder={`Enter ${fieldName.replace("_", " ")}`} />
                )}
                <FormMessage>{errors[fieldName]?.message}</FormMessage>
              </FormItem>
            )}
          />
        ))}

        {/* Book Condition */}
        <FormField
          control={control}
          name="book_condition"
          render={() => (
            <FormItem>
              <Label>Condition</Label>
              <div className="flex gap-4">
                {Object.values(BOOK_CONDITION_TYPE).map((cond) => (
                  <div key={cond} className="flex items-center space-x-2">
                    <Checkbox
                      checked={watchCondition === cond}
                      onCheckedChange={() => setValue("book_condition", cond)}
                    />
                    <span className="capitalize">{cond}</span>
                  </div>
                ))}
              </div>
              <FormMessage>{errors.book_condition?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={control}
          name="book_description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <Label>Description</Label>
              <Textarea {...field} placeholder="Enter description" />
              <FormMessage>{errors.book_description?.message}</FormMessage>
            </FormItem>)}
        />

        {/* Images */}
        <FormItem className="col-span-2">
          <Label>Upload Images</Label>
          <Controller
            name="book_images"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} />
            )}
          />
          <FormMessage>{errors.book_images?.message}</FormMessage>
        </FormItem>

        {/* Submit */}
        <div className="col-span-2 flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}