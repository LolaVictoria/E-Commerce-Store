import api from "./api";
import type { CartItemRequest, CartResponse } from "../types/cart";

export const getCart = async (): Promise<CartResponse> => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (
  data: CartItemRequest
): Promise<CartResponse> => {
  const response = await api.post("/cart/items", data);
  return response.data;
};

export const updateCartItem = async (
  id: number,
  data: CartItemRequest
): Promise<CartResponse> => {
  const response = await api.put(`/cart/items/${id}`, data);
  return response.data;
};

export const deleteCartItem = async (
  id: number
): Promise<void> => {
  await api.delete(`/cart/items/${id}`);
};

export const clearCart = async (): Promise<void> => {
  await api.delete("/cart");
};