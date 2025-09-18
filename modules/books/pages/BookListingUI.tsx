"use client"
import { books } from "@/data";
import React, { useState } from "react";
import BookCard from "../components/BookCard";
import BookFilterPanel from "../components/BookFilterPanel";


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
        <div className="flex p-6 gap-6 container">

            {/* Filters */}
            <div className="w-64 shrink-0">
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

            {/* Book Cards */}
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
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
    );
};

export default BookListingUI;
