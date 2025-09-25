"use client";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { useCartStore } from "@/zustand/cartStore";

const CartIcon = () => {

  const router = useRouter();
  const items = useCartStore((state) => state.items);

  return (
    <button
      onClick={() => router.push(PAGE_PATHS.cart)}
      className="relative p-2 rounded-full"
    >
      <FaShoppingCart className="text-xl" />
      {items?.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {items?.length}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
