"use client";

import Image from "next/image";
import { BsImageFill } from "react-icons/bs";
import { TbTrashFilled } from "react-icons/tb";
import { CartItem } from "@/zustand/cartStore";
import { Button } from "@/components/ui/button";
import WishButton from "@/components/global/WishButton";

interface CartItemCardProps {
    item: CartItem;
    onDelete?: () => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onWishButtonClick?: () => void;
}

const CartItemCard = ({
    item,
    onDelete,
    onIncrement,
    onDecrement,
    onWishButtonClick,

}: CartItemCardProps) => {

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b last:border-b-0 w-full">
            {/* Left Section */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                {
                    item?.image
                        ?
                        <Image
                            width={70}
                            height={70}
                            alt={item.name}
                            src={item?.image ?? ""}
                            className="rounded-lg object-cover w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]"
                        />
                        :
                        <div className="rounded-lg object-cover w-[50px] h-[50px] 
                        sm:w-[50px] sm:h-[50px] flex justify-center items-center border text-2xl">
                            <BsImageFill />
                        </div>
                }
                <div className="flex flex-col">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base font-semibold">${item.price}</p>
                        <p className="text-sm text-gray-500 line-through">
                            ${item.discountPrice}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                    <Button onClick={onDecrement} className="bg-primary/80 size-10 p-0">
                        -
                    </Button>
                    <div className="w-[25px] text-center">{item.quantity}</div>
                    <Button onClick={onIncrement} className="bg-primary/80 size-10 p-0">
                        +
                    </Button>
                </div>

                <WishButton onClick={onWishButtonClick} />

                <Button
                    variant="outline"
                    onClick={onDelete}
                    className="text-destructive hover:text-red-500 size-10 p-0 flex items-center justify-center"
                >
                    <TbTrashFilled size={18} />
                </Button>
            </div>
        </div>
    );
};

export default CartItemCard;
