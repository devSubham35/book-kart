"use client"
import { useState } from "react";
import CartItemCard from "../components/CartItemCard";
import OrderSummary from "../components/OrderSummary";
import { bookData } from "@/data";

export interface cartItemType {
    id: number,
    name: string,
    image: string,
    price: number,
    quantity: number,
    originalPrice: number,
}

const initialCart = [
    {
        id: 1,
        name: "Book 1",
        image: bookData?.images[0],
        price: 20,
        originalPrice: 30,
        quantity: 1,
    },
    {
        id: 2,
        name: "Book 2",
        image: bookData?.images[1],
        price: 15,
        originalPrice: 25,
        quantity: 2,
    }
];


const CartUI = () => {

    const [cart, setCart] = useState(initialCart);

    const handleIncrement = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleWishlist = (id: number) => {
        console.log(`Added item ${id} to wishlist`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete item ${id}`);
    };

    return (
        <div className="container p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 border rounded-lg">
                <h2 className="text-xl font-semibold p-4 border-b">Shopping Cart</h2>
                {cart.map((item) => (
                    <CartItemCard
                        key={item.id}
                        item={item}
                        onDelete={()=> handleDelete(item?.id)}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                        onWishButtonClick={() => handleWishlist(item.id)}
                    />
                ))}
            </div>
            <div className="w-full lg:w-1/3">
                <OrderSummary cart={cart} />
            </div>
        </div>
    );
};

export default CartUI;