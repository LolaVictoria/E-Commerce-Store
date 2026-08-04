import { ProductCategory } from "./product";

export interface CartItemRequest {
  productId: number;
  quantity: number;
}
export interface CartItemResponse {
    id: number;
    quantity: number;
    priceAtTime: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        category: ProductCategory;
        imageUrl: string;
        sellerName: string;
    };
}
export interface CartResponse {
  id: number;
  items: CartItemResponse[];
  totalPrice: number;
}