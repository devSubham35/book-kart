import { books } from '@/data'
import BookCard from '@/modules/books/components/BookCard'

const ProductListing = () => {
    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    canBuy={false}
                    isFavorite={true}
                    image={book.image}
                    title={book.title}
                    price={book.price}
                    isWishItem={false}
                    discount={book.discount}
                    category={book?.category}
                    condition={book?.condition}
                    originalPrice={book.originalPrice}
                />
            ))}
        </div>
    )
}

export default ProductListing