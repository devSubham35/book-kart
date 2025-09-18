import { books } from '@/data'
import BookCard from '@/modules/books/components/BookCard'

const WishProductListing = () => {
    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    canBuy={true}
                    isFavorite={true}
                    image={book.image}
                    title={book.title}
                    price={book.price}
                    isWishItem={true}
                    discount={book.discount}
                    category={book?.category}
                    condition={book?.condition}
                    originalPrice={book.originalPrice}
                />
            ))}
        </div>
    )
}

export default WishProductListing