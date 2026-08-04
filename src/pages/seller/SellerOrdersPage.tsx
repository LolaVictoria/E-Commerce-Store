import { useEffect, useState } from "react";
import { getSellerOrders } from "../../services/orderApi";
import { OrderResponse } from "../../types/order";
import { formatCurrency } from "../../utils/formatCurrency";
import ErrorPage from "../errors/ErrorPage";
import { Spinner } from "../../components/ui/Spinner";

const SellerOrders = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await getSellerOrders();
                setOrders(response);
            } catch (error) {
                console.error(error);
                setError(true)
            } finally {
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

    if (orders.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">
                    No customer orders yet.
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Customer Orders
            </h1>

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

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center border-b pb-3"
                                >
                                    <div className="flex gap-4 items-center">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />

                                        <div>
                                            <h3 className="font-semibold">
                                                {item.product.name}
                                            </h3>

                                            <p>
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <p>
                                        {formatCurrency(
                                            item.priceAtPurchase *
                                                item.quantity
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <p className="font-bold text-lg">
                                Total:{" "}
                                {formatCurrency(
                                    order.totalPrice
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerOrders;
