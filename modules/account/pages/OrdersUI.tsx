import { sampleOrders } from '@/data'
import AccountHeader from '../components/AccountHeader'
import OrderListingTable from '../components/orders/OrderListingTable'

const OrdersUI = () => {
    return (
        <>
            <AccountHeader
                title="Orders"
                description="View, track all your orders in one place."
            />

            <div className="mt-4">
                <OrderListingTable orders={sampleOrders} />
            </div>
        </>
    )
}

export default OrdersUI