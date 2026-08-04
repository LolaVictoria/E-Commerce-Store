import { useEffect, useState } from "react";
import { getPurchases } from "../../services/orderApi";
import { OrderResponse } from "../../types/order";
import { formatCurrency } from "../../utils/formatCurrency";
import ErrorPage from "../errors/ErrorPage";
import { Spinner } from "../../components/ui/Spinner";

const Purchases = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await getPurchases();
                setOrders(response);
            } catch {
                console.error(error)
                setError(true)
            }
             finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return (
            <ErrorPage
                description="Unable to load products."
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Purchases
            </h1>

            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded-lg p-5 shadow-sm bg-white"
                        >
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h2 className="font-bold">
                                        Order #{order.id}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${
                                        order.status === "DELIVERED"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "SHIPPED"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "PROCESSING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.status === "CANCELLED"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center border-b pb-3"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />

                                            <div>
                                                <h3 className="font-semibold">
                                                    {item.product.name}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="font-semibold">
                                            {formatCurrency(
                                                item.priceAtPurchase *
                                                    item.quantity
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-4">
                                <p className="text-lg font-bold">
                                    Total:{" "}
                                    {formatCurrency(order.totalPrice)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Purchases;