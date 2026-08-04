import { ProductResponse } from "./product";

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderItemResponse {
  id: number;
  quantity: number;
  priceAtPurchase: number;
  product: ProductResponse;
}

export interface OrderResponse {
  id: number;
  items: OrderItemResponse[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}