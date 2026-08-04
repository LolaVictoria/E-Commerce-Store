import api from "./api";
import {
  ProductResponse,
  ProductRequest,
  ProductPageResponse,
  ProductCategory,
} from "../types/product";

// Get all products
export const getAllProducts = async (
  page = 0,
  size = 20,
  category?: ProductCategory,
  keyword?: string,
  sort = "createdAt"
): Promise<ProductPageResponse> => {
  const response = await api.get<ProductPageResponse>("/products", {
    params: {
      page,
      size,
      category,
      keyword,
      sort
    },
  });

  return response.data;
};

// Get one product
export const getAProduct = async (id: number): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>(`/products/${id}`);
  return response.data;
};

// Create product
export const createProduct = async (
  product: ProductRequest
): Promise<ProductResponse> => {
  const response = await api.post<ProductResponse>("/products", product);
  return response.data;
};

// Update product
export const updateProduct = async (
  id: number,
  product: Partial<ProductRequest>
): Promise<ProductResponse> => {
  // The backend declares ProductUpdateRequest as query parameters, rather
  // than a JSON request body.
  const response = await api.put<ProductResponse>(`/products/${id}`, null, {
    params: product,
  });
  return response.data;
};

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// Seller products
export const getMyProducts = async (
  page = 0,
  size = 20,
  category?: ProductCategory,
  keyword?: string,
  sort?: |"createdAt,desc"
        |"createdAt,asc"
        |"price,asc"
        |"price,desc"
): Promise<ProductPageResponse> => {
  const response = await api.get<ProductPageResponse>(
    "/products/my-products",
    {
      params: {
        page,
        size,
        category,
        keyword,
        sort
      },
    }
  );

  return response.data;
};

export const getProductById = async (
  id: number
): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>(`/products/${id}`);
  return response.data;
};
