import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
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
            console.log("Fetching products for seller:", `${businessName}-${currentEmail}`);
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where('sellerId', '==', `${businessName}-${currentEmail}`));
            const querySnapshot = await getDocs(q);

            const productsList: Product[] = [];
            querySnapshot.forEach((doc) => {
                productsList.push({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) });
            });

            console.log("Fetched products:", productsList);
            setProducts(productsList);
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

    useEffect(() => {
        fetchProducts();
    }, [businessName, fetchProducts]);

    return (
        <ProductContext.Provider value={{ products, addProduct, fetchProducts, message }}>
            {children}
        </ProductContext.Provider>
    );
};
