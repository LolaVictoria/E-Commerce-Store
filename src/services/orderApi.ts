import api from "./api";
import { OrderResponse } from "../types/order";

// Buyer places an order
export const placeOrder = async (): Promise<OrderResponse> => {
  const response = await api.post("/orders");
  return response.data;
};

// Buyer gets their purchase history
export const getPurchases = async (): Promise<OrderResponse[]> => {
  const response = await api.get("/orders");
  return response.data;
};

// Buyer gets one purchase
export const getPurchaseById = async (
  id: number
): Promise<OrderResponse> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Seller gets customer orders
export const getSellerOrders = async (): Promise<OrderResponse[]> => {
  const response = await api.get("/seller/orders");
  return response.data;
};