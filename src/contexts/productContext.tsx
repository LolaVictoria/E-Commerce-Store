import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, Dispatch, SetStateAction } from "react"; 
import {
  getAllProducts,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct as deleteProductApi,
} from "../services/productApi";

import type {
  ProductResponse,
  ProductRequest,
  ProductCategory,
} from "../types/product";


interface ProductContextProps {
    products: ProductResponse[];
    sellerProducts: ProductResponse[];
    addProduct: (newProduct: ProductRequest) => Promise<void>;
    fetchAllProducts: (
        pageNumber: number,
        category?: ProductCategory,
        keyword?: string,
        sort?: "createdAt"
    ) => Promise<void>;
    fetchSellerProducts: () => Promise<void>;
    deleteProduct: (productId: number) => Promise<void>;
    editProduct: (productId: number, updatedProduct: Partial<ProductRequest>) => Promise<void>;
    addProductMessage: string; 
    editProductMessage: string; 
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [sellerProducts, setSellerProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [addProductMessage, setAddProductMessage] = useState("");
    const [editProductMessage, setEditProductMessage] = useState(""); 
    const [messageTimeout, setMessageTimeout] =
    useState<ReturnType<typeof setTimeout> | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    const fetchAllProducts = useCallback(
        async (
            pageNumber: number,
            category?: ProductCategory,
            keyword?: string,
            sort = "createdAt" ) => {
        setLoading(true);

        try {
            const response = await getAllProducts(
                pageNumber,
                20,
                category,
                keyword,
                sort);

            setProducts(response.content);
            setTotalPages(response.totalPages);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [])

    const fetchSellerProducts = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getMyProducts();

            setSellerProducts(response.content);
        } catch (error) {
            console.error("Error fetching seller products:", error);
        } finally {
            setLoading(false);
        }
    }, []);
    
    
    const addProduct = async (newProduct: ProductRequest) => {
        try {
            setLoading(true);

            const createdProduct = await createProduct(newProduct);
            setSellerProducts((prev) => [...prev, createdProduct]);
            setProducts((prev) => {
                const updated = [...prev, createdProduct];
                return updated;
            });
            setAddProductMessage("Product added successfully.");
            setEditProductMessage("");

            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setAddProductMessage(""), 5000);
            setMessageTimeout(timeoutId);

        } catch (error) {
            console.error("Error adding product:", error);

            setAddProductMessage("Error adding product.");

            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setAddProductMessage(""), 5000);
            setMessageTimeout(timeoutId);
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId: number) => {
        try {
            await deleteProductApi(productId);

            setProducts((prev) => {
                const updated = prev.filter((product) => product.id !== productId);
                sessionStorage.setItem("products", JSON.stringify(updated));
                return updated;
        });

            setEditProductMessage("Product deleted successfully.");

        } catch (error) {
            console.error("Error deleting product:", error);

            setEditProductMessage("Error deleting product.");
            throw error;
        }
    };


    const editProduct = async (
        productId: number,
        updatedProduct: Partial<ProductRequest>
    ) => {
        try {
            setLoading(true);

            const updatedProductResponse = await updateProduct(productId, updatedProduct);

            setProducts((prev) => {
                const updated = prev.map((product) =>
                    product.id === productId ? updatedProductResponse : product
                );
                sessionStorage.setItem("products", JSON.stringify(updated));
                return updated;
            }
            );

            setSellerProducts((prev) =>
                prev.map((product) =>
                    product.id === productId ? updatedProductResponse : product
                )
            );

            setEditProductMessage("Product updated successfully.");
            setAddProductMessage("");

            if (messageTimeout) clearTimeout(messageTimeout);

            const timeoutId = setTimeout(
                () => setEditProductMessage(""),
                5000
            );

            setMessageTimeout(timeoutId);
        } catch (error) {
            console.error("Error updating product:", error);

            setEditProductMessage("Error updating product.");
            setAddProductMessage("");

            if (messageTimeout) clearTimeout(messageTimeout);

            const timeoutId = setTimeout(
                () => setEditProductMessage(""),
                5000
            );

            setMessageTimeout(timeoutId);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllProducts(page);
    }, [fetchAllProducts, page]);

    return (
        <ProductContext.Provider
            value={{
                products,
                sellerProducts,
                page,
                setPage,
                totalPages,
                editProduct,
                deleteProduct,
                addProduct,
                fetchSellerProducts,
                fetchAllProducts,
                addProductMessage,
                editProductMessage,
                loading,
                setLoading,
                error,
                setError,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
