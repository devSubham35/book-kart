"use client";

import AddressUI from "../components/AddressUI";
import { useCartStore } from "@/zustand/cartStore";
import CartItemCard from "../components/CartItemCard";
import OrderSummary from "../components/OrderSummary";
import { useRouter } from "next/navigation";
import { HomeIcon } from "lucide-react"; // Or any other icon library
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/routes/pagePaths";

const CartUI = () => {

    const router = useRouter();
    const { items, updateQuantity, removeItem } = useCartStore();

    const handleIncrement = (id: string) => {
        const item = items.find(i => i.id === id);
        if (item) updateQuantity(id, item.quantity + 1);
    };

    const handleDecrement = (id: string) => {
        const item = items.find(i => i.id === id);
        if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
    };

    const handleWishlist = (id: string) => {
        console.log(`Added item ${id} to wishlist`);
    };

    const handleDelete = (id: string) => {
        removeItem(id);
    };

    const goHome = () => {
        router.push(PAGE_PATHS.books);
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
                <HomeIcon className="w-16 h-16 text-gray-400" />
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-gray-500">Looks like you have not added anything to your cart yet.</p>
                <Button onClick={goHome}>
                    Go to Shop
                </Button>
            </div>
        );
    }

    console.log(items, "++66")

    return (
        <div className="container py-6 flex flex-col lg:flex-row gap-6 scrollbar-hidden">
            <div className="flex-1 border rounded-lg h-fit">
                <h2 className="text-xl font-semibold p-4 border-b">Shopping Cart</h2>
                {items.map((item) => (
                    <CartItemCard
                        key={item.id}
                        item={item}
                        onDelete={() => handleDelete(item.id)}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                        onWishButtonClick={() => handleWishlist(item.id)}
                    />
                ))}
            </div>

            <div className="w-full lg:w-1/3 space-y-6">
                <OrderSummary cart={items} />
                <AddressUI />
            </div>
        </div>
    );
};

export default CartUI;
