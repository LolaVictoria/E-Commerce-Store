import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase"; // Import your Firebase instance
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./authContext"; // Assuming you have an AuthContext to get the user

type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type ShoppingCartContextType = {
  cartItems: CartItemType[];
  increaseCartQuantity: (item: CartItemType) => void;
  decreaseCartQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentEmail } = useAuth(); // Get the current user from AuthContext
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getItemQuantity = (id: number): number => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (currentEmail) {
        const cartDocRef = doc(db, "carts", currentEmail);
        const cartDoc = await getDoc(cartDocRef);
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().items || []);
        }
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchCartItems();
  }, [currentEmail]);

  const saveCartItems = async (items: CartItemType[]) => {
    if (currentEmail) {
      const cartDocRef = doc(db, "carts", currentEmail);
      await setDoc(cartDocRef, { items });
    }
  };

  // Save cart items to Firestore whenever cartItems change
  useEffect(() => {
    if (!loading) {
      saveCartItems(cartItems);
    }
  }, [cartItems, currentEmail, loading]);

  const increaseCartQuantity = (item: CartItemType) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    let newCartItems;
    if (existingItem) {
      newCartItems = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCartItems = [...cartItems, { ...item, quantity: 1 }];
    }
    setCartItems(newCartItems);
  };

  const decreaseCartQuantity = (id: number) => {
    const existingItem = cartItems.find((i) => i.id === id);
    if (existingItem && existingItem.quantity > 1) {
      const newCartItems = cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
      setCartItems(newCartItems);
    } else {
      removeItemFromCart(id);
    }
  };

  const removeItemFromCart = (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
