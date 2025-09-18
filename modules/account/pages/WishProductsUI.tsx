import AccountHeader from '../components/AccountHeader'
import WishProductListing from '../components/wishlist/WishProductListing'

const WishProductsUI = () => {
    return (
        <>
            <AccountHeader
                title="Wishlist"
                description="Your favorite items saved in one place for easy access."
            />

            <div className="mt-4">
                <WishProductListing />
            </div>
        </>
    )
}

export default WishProductsUI