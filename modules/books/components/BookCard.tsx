"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { PAGE_PATHS } from '@/routes/pagePaths';
import { Button } from "@/components/ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

interface BookCardProps {
    id?: string | number;
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

    const handleNavigateProductDetailsPage = () => {
        router.push(`${PAGE_PATHS.books}/${id}`)
    }

    return (
        <div className="relative h-fit bg-white dark:bg-gray-800 
        rounded-2xl overflow-hidden duration-300 border">

            {/* Favorite Button */}
            {isWishItem && <button
                onClick={onFavoriteToggle}
                className="absolute top-3 right-3 text-primary z-10 transition-colors duration-200 size-8 rounded-full
                bg-secondary dark:bg-black flex items-center justify-center"
            >
                {isFavorite ? <IoHeartSharp size={20} /> : <IoHeartOutline size={20} />}
            </button>
            }

            {/* Book Image */}
            <div onClick={handleNavigateProductDetailsPage} className="relative flex justify-center">
                {/* Discount Badge */}
                {discount && (
                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground 
                    text-xs font-semibold px-2 py-1 rounded-md z-10">
                        {discount} OFF
                    </div>
                )}
                <div className="w-full h-40 rounded-t-xl overflow-hidden shadow-md cursor-pointer">
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
            <div className="p-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">₹{price}</span>
                    {originalPrice && (
                        <span className="text-sm line-through text-gray-400 dark:text-gray-400">₹{originalPrice}</span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    {category && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category}</p>}
                    {condition && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{condition} condition</p>
                    )}
                </div>
            </div>

            {canBuy && <Button className="w-full">
                <span><FaCartShopping /></span>
                Buy Now
            </Button>
            }
        </div>
    );
};

export default BookCard;
