import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./authContext";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    sellerId: string;
}

interface ProductContextProps {
    products: Product[];
    addProduct: (newProduct: Omit<Product, 'id' | 'sellerId'>) => Promise<void>;
    fetchProducts: () => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    editProduct: (productId: string, updatedProduct: Partial<Omit<Product, 'id' | 'sellerId'>>) => Promise<void>;
    message: string;
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
    const { businessName, currentEmail } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState("");
    const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(null);

    const fetchProducts = useCallback(async () => {
        if (!businessName || !currentEmail) {
            console.warn("Missing businessName or currentEmail for product fetch");
            return;
        }

        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where('sellerId', '==', `${businessName}-${currentEmail}`));
            const querySnapshot = await getDocs(q);

            const productsList: Product[] = [];
            querySnapshot.forEach((doc) => {
                productsList.push({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) });
            });

            setProducts(productsList);
            sessionStorage.setItem("products", JSON.stringify(productsList));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [businessName, currentEmail]);

    const addProduct = async (newProduct: Omit<Product, 'id' | 'sellerId'>) => {
        if (!businessName || !currentEmail) {
            console.warn("Missing businessName or currentEmail for adding product");
            return;
        }

        try {
            const productId = `${newProduct.name}-${Date.now()}`;
            const productDoc = {
                ...newProduct,
                sellerId: `${businessName}-${currentEmail}`,
                createdAt: new Date(),
                lastDateUpdated: Date.now()
            };

            await setDoc(doc(db, "products", productId), productDoc);

            setProducts((prevProducts) => [
                ...prevProducts,
                { id: productId, sellerId: `${businessName}-${currentEmail}`, ...newProduct }
            ]);

            setMessage("Product added successfully.");

            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setMessage(""), 5000);
            setMessageTimeout(timeoutId);
        } catch (error) {
            console.error("Error adding product:", error);
            setMessage("Error adding product.");
            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setMessage(""), 5000);
            setMessageTimeout(timeoutId);
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            await deleteDoc(doc(db, "products", productId));
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            setMessage("Product deleted successfully.");

            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setMessage(""), 5000);
            setMessageTimeout(timeoutId);
        } catch (error) {
            console.error("Error deleting product:", error);
            setMessage("Error deleting product.");
            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setMessage(""), 5000);
            setMessageTimeout(timeoutId);
        }
    };

    const editProduct = async (productId: string, updatedProduct: Partial<Omit<Product, 'id' | 'sellerId'>>) => {
        try {
            await updateDoc(doc(db, "products", productId), {
                ...updatedProduct,
                lastDateUpdated: Date.now()
            });

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, ...updatedProduct } : product
                )
            );

            setMessage("Product updated successfully.");
            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setMessage(""), 5000);
            setMessageTimeout(timeoutId);
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage("Error updating product.");
            if (messageTimeout) clearTimeout(messageTimeout);
            const timeoutId = setTimeout(() => setMessage(""), 5000);
            setMessageTimeout(timeoutId);
        }
    };

    useEffect(() => {
        const storedProducts = sessionStorage.getItem("products");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            fetchProducts();
        }
    }, [fetchProducts]);

    return (
        <ProductContext.Provider value={{ products, addProduct, fetchProducts, deleteProduct, editProduct, message }}>
            {children}
        </ProductContext.Provider>
    );
};
