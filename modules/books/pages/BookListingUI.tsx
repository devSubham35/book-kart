"use client";

import { books } from "@/data";
import React, { useState } from "react";
import BookCard from "../components/BookCard";
import BookFilterPanel from "../components/BookFilterPanel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

const conditionOptions = [
  { label: "New", value: "new" },
  { label: "Used", value: "used" },
];

const categoryOptions = [
  { label: "Mathematics", value: "math" },
  { label: "Science", value: "science" },
];

const classTypeOptions = [
  { label: "6th Class", value: "6" },
  { label: "7th Class", value: "7" },
];

const BookListingUI = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedClassType, setSelectedClassType] = useState<string[]>([]);

  return (
    <div className="flex gap-6 h-[calc(100vh-4rem)] container lg:py-6">
      
      {/* Desktop Sidebar Filters */}
      <div className="hidden lg:block w-60 shrink-0 sticky top-6 self-start space-y-5">
        <BookFilterPanel
          title="Condition"
          options={conditionOptions}
          onSelect={setSelectedCondition}
          selectedValues={selectedCondition}
        />
        <BookFilterPanel
          title="Category"
          options={categoryOptions}
          onSelect={setSelectedCategory}
          selectedValues={selectedCategory}
        />
        <BookFilterPanel
          title="Class Type"
          options={classTypeOptions}
          onSelect={setSelectedClassType}
          selectedValues={selectedClassType}
        />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full p-3 shadow-lg">
              <Filter className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto p-5">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            <BookFilterPanel
              title="Condition"
              options={conditionOptions}
              onSelect={setSelectedCondition}
              selectedValues={selectedCondition}
            />
            <BookFilterPanel
              title="Category"
              options={categoryOptions}
              onSelect={setSelectedCategory}
              selectedValues={selectedCategory}
            />
            <BookFilterPanel
              title="Class Type"
              options={classTypeOptions}
              onSelect={setSelectedClassType}
              selectedValues={selectedClassType}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Book Cards */}
      <div className="w-full lg:overflow-y-auto lg:pr-2">
        <div className="grid rid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard
              id={book.id}
              key={book.id}
              isFavorite={true}
              image={book.image}
              title={book.title}
              price={book.price}
              discount={book.discount}
              category={book?.category}
              condition={book?.condition}
              originalPrice={book.originalPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookListingUI;
