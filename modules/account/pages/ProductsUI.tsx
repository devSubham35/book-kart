import AccountHeader from '../components/AccountHeader'
import ProductListing from '../components/products/ProductListing'

const ProductsUI = () => {
    return (
        <>
            <AccountHeader
                title="My Products"
                description="View details of products you own"
            />

            <div className="mt-4">
                <ProductListing />
            </div>
        </>
    )
}

export default ProductsUI