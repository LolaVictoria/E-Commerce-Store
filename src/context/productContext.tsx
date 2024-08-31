import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
    const { businessName } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        if (!businessName) return;

        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where('sellerId', '==', businessName));
            const querySnapshot = await getDocs(q);

            const productsList: Product[] = [];
            querySnapshot.forEach((doc) => {
                productsList.push({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) });
            });

            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addProduct = async (newProduct: Omit<Product, 'id' | 'sellerId'>) => {
        if (!businessName) return;

        try {
            const productId = `${newProduct.name}-${Date.now()}`;
            const productDoc = {
                ...newProduct,
                sellerId: businessName,
                createdAt: new Date(),
            };

            await setDoc(doc(db, "products", productId), productDoc);

            setProducts((prevProducts) => [
                ...prevProducts,
                { id: productId, sellerId: businessName, ...newProduct }
            ]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [businessName]);

    return (
        <ProductContext.Provider value={{ products, addProduct, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
