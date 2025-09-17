import { Button } from "@/components/ui/button";
import { cartItemType } from "../pages/CartUI";

const OrderSummary = ({ cart }: { cart: cartItemType[] }) => {

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = cart.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Discount</span>
        <span className="text-green-600">-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button className="mt-4 w-full py-2">
        Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
