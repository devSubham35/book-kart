"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { Button } from "@/components/ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useCartStore } from "@/zustand/cartStore";

interface BookCardProps {
  id?: string;
  image: string;
  title: string;
  price: number;
  discount?: string;
  category?: string;
  condition?: string;
  isFavorite?: boolean;
  canBuy?: boolean;
  isWishItem?: boolean;
  originalPrice?: number;
  onFavoriteToggle?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  image,
  title,
  price,
  discount,
  category,
  condition,
  originalPrice,
  canBuy = true,
  onFavoriteToggle,
  isWishItem = true,
  isFavorite = false,
}) => {

  const router = useRouter();
  const { addItem } = useCartStore();

  const handleAddToCart =()=>{
    router.push(PAGE_PATHS.cart)
    addItem({
      quantity: 1,
      id: id as string,
      name: title as string,
      price: originalPrice as number,
      discountPrice: Number(price) as number,
    })
  }

  const handleNavigateProductDetailsPage = () => {
    router.push(`${PAGE_PATHS.books}/${id}`);
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-800 
      rounded-2xl overflow-hidden duration-300 border h-full flex flex-col"
    >
      {/* Favorite Button */}
      {isWishItem && (
        <button
          onClick={onFavoriteToggle}
          className="absolute top-3 right-3 text-rose-600 z-10 transition-colors duration-200 size-8 rounded-full
          bg-background border flex items-center justify-center"
        >
          {isFavorite ? <IoHeartSharp size={20} /> : <IoHeartOutline size={20} />}
        </button>
      )}

      {/* Book Image */}
      <div
        onClick={handleNavigateProductDetailsPage}
        className="relative flex justify-center"
      >
        {/* Discount Badge */}
        {discount && (
          <div
            className="absolute bottom-2 left-2 bg-primary text-primary-foreground 
            text-xs font-semibold px-2 py-1 rounded-md z-10"
          >
            {discount} OFF
          </div>
        )}
        <div className="w-full h-32 rounded-t-xl overflow-hidden shadow-md cursor-pointer">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate p-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 px-2">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ₹{price}
          </span>
          {originalPrice && (
            <span className="text-sm line-through text-gray-400 dark:text-gray-400">
              ₹{originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between p-2">
          {category && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{category}</p>
          )}
          {condition && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {condition} condition
            </p>
          )}
        </div>

        {/* Push button to bottom */}
        {canBuy && (
          <Button
            onClick={handleAddToCart}
            className="w-full mt-auto"
          >
            <span>
              <FaCartShopping />
            </span>
            Buy Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
