import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../contexts/shoppingCartContext";
import { placeOrder } from "../../services/orderApi";
import { formatCurrency } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

const Checkout = () => {
    const [placingOrder, setPlacingOrder] = useState(false);
    const { cartItems, clearCart } = useShoppingCart();

    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        try {
            setPlacingOrder(true);

            await placeOrder();
            await clearCart();

            toast.success("Order placed successfully!");

            navigate("/purchases");
        } catch {
            toast.error("Failed to place order.");
        } finally {
            setPlacingOrder(false);
        }
    };

    // Show this instead if the cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center mt-20">
                <h2 className="text-2xl font-bold">
                    Your cart is empty.
                </h2>

                <button
                    onClick={() => navigate("/products")}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Checkout
            </h1>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between border-b pb-4"
                    >
                        <div>
                            <h3 className="font-semibold">
                                {item.product.name}
                            </h3>

                            <p>Qty: {item.quantity}</p>
                        </div>

                        <p>
                            {formatCurrency(
                                item.product.price * item.quantity
                            )}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>{formatCurrency(total)}</span>
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded disabled:bg-green-300"
            >
                {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
        </div>
    );
};

export default Checkout;
