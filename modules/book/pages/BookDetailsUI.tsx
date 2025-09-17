"use client";

import { bookData } from "@/data";
import { Button } from "@/components/ui/button";
import SellerCard from "../components/SellerCard";
import ImageViewer from "../components/ImageViewer";
import { Card, CardContent } from "@/components/ui/card";
import BookDetailsCard from "../components/BookDetailsCard";

interface BookDetailsProps {
    book: {
        id: string;
        title: string;
        price: number;
        originalPrice: number;
        shipping: string;
        posted: string;
        subject: string;
        course: string;
        category: string;
        author: string;
        edition: string;
        condition: string;
        description: string;
        seller: {
            name: string;
            location: string;
            contact: string;
            verified: boolean;
        };
        images: string[];
    };
}

export default function BookDetailsUI({ book }: BookDetailsProps) {

    // calculate discount %
    const discount = Math.round(
        ((book.originalPrice - book.price) / book.originalPrice) * 100
    );

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
            {/* Top Section */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* Image Gallery */}
                <ImageViewer images={bookData?.images} />

                {/* Book Info */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{book.title}</h1>
                    <p className="text-sm text-muted-foreground">Posted {book.posted}</p>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">₹{book.price}</span>
                        <span className="line-through text-muted-foreground">
                            ₹{book.originalPrice}
                        </span>
                        <span className="text-red-500 font-semibold">{discount}% Off</span>
                    </div>

                    <p className="text-green-600 font-medium">{book.shipping}</p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button className="px-6">Buy Now</Button>
                    </div>

                    {/* Book Details */}
                    <BookDetailsCard
                        course={bookData?.course}
                        author={bookData?.author}
                        subject={bookData?.subject}
                        edition={bookData?.edition}
                        category={bookData?.category}
                        condition={bookData?.condition}
                    />

                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Description */}
                <Card className="shadow-none">
                    <CardContent>
                        <h2 className="font-semibold">Description</h2>
                        <p className="text-sm mb-4">{book.description}</p>
                        <h3 className="font-semibold mb-2">Our Community</h3>
                        <p className="text-sm text-muted-foreground">
                            We’re not just another shopping website where you buy from
                            professional sellers — we are a vibrant community of students, book
                            lovers across India who deliver happiness to each other!
                        </p>
                    </CardContent>
                </Card>

                {/* Seller Info */}
                <SellerCard
                    name={bookData?.seller?.name}
                    email={bookData?.seller?.email}
                    location={bookData?.seller?.location}
                    contactNo={bookData?.seller?.contact}
                    isVerified={bookData?.seller?.verified}
                />
            </div>
        </div>
    );
}
