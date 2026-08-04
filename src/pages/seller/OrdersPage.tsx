import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSellerOrders as sellerOrders } from "../../services/orderApi";
import { OrderResponse } from "../../types/order";
import { Spinner } from "../../components/ui/Spinner";
import ErrorPage from "../errors/ErrorPage";

const Orders = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await sellerOrders();
      setOrders(response);
    } catch (err) {
      console.error(err);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

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
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-5 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₦{order.totalPrice.toLocaleString()}
                  </p>

                  <span className="text-green-600 font-medium">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 rounded object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">
                        {item.product.name}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div>
                      ₦{item.priceAtPurchase.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <Link
                  to={`/orders/${order.id}`}
                  className="text-[#2ECF5A] font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
