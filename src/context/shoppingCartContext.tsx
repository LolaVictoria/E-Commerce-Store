import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./authContext";

type CartItemType = {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
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
  const { currentEmail } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

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
         // cartItemsResponse = cartDoc.data().items
          setCartItems(cartDoc.data().items || []);
          sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
      }
      setLoading(false);
    };

    if (currentEmail) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, [cartItems, currentEmail]);

  const updateCartInFirestore = async (updatedItems: CartItemType[]) => {
    if (currentEmail) {
      const cartDocRef = doc(db, "carts", currentEmail);
      await setDoc(cartDocRef, { items: updatedItems });
      sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  };

  
  useEffect(() => {
    const storedItems = sessionStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const increaseCartQuantity = async (item: CartItemType) => {
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
    await updateCartInFirestore(newCartItems);
  };

  const decreaseCartQuantity = async (id: number) => {
    const existingItem = cartItems.find((i) => i.id === id);
    if (existingItem && existingItem.quantity > 1) {
      const newCartItems = cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
      setCartItems(newCartItems);
      await updateCartInFirestore(newCartItems);
    } else {
      removeItemFromCart(id);
    }
  };

  const removeItemFromCart = async (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    await updateCartInFirestore(newCartItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    if (currentEmail) {
      const cartDocRef = doc(db, "carts", currentEmail);
      await setDoc(cartDocRef, { items: [] });
      sessionStorage.removeItem("cartItems");
    }
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
      {!loading && children}
    </ShoppingCartContext.Provider>
  );
};
