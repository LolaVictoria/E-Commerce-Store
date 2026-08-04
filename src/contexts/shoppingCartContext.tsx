import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart as clearCartApi,
} from "../services/cartApi";

import type { CartItemRequest, CartResponse } from "../types/cart";
import { useAuth } from "./authContext";



type ShoppingCartContextType = {
  cartItems: CartResponse["items"];
  increaseCartQuantity: (item: CartItemRequest) => Promise<void>;
  decreaseCartQuantity: (id: number) => Promise<void>;
  removeItemFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemQuantity: (id: number) => number; 
  loading: boolean;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCart: () => Promise<void>;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartResponse["items"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const findCartItem = (productId: number) => {
    return cartItems.find(
        (item) => item.product.id === productId
      );
  };

  const getItemQuantity = (productId: number): number => {
    return findCartItem(productId)?.quantity ?? 0;
  };

      const fetchCart = useCallback(async () => {
        if (!isAuthenticated) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setError(false);

          const response = await getCart();

          setCartItems(response.items);

          sessionStorage.setItem(
            "cartItems",
            JSON.stringify(response.items)
          );
        } catch (error) {
          console.error("Error fetching cart:", error);
          setError(true);
        } finally {
          setLoading(false);
        }
      }, [isAuthenticated]);

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  

  const increaseCartQuantity = async (
    item: CartItemRequest
  ) => {
    try {
      setError(false);
      const response = await addToCart(item);

      setCartItems(response.items);

      sessionStorage.setItem(
        "cartItems",
        JSON.stringify(response.items)
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError(true);
      throw error;
    }
  };
  
  const decreaseCartQuantity = async (
        productId: number
    ) => {
        const cartItem = findCartItem(productId);

        if (!cartItem) return;

        if (cartItem.quantity === 1) {
            await removeItemFromCart(productId);
            return;
        }

        try {
            const response = await updateCartItem(
                cartItem.id,
                {
                    productId: cartItem.product.id,
                    quantity: cartItem.quantity - 1,
                }
            );

            setCartItems(response.items);

            sessionStorage.setItem(
                "cartItems",
                JSON.stringify(response.items)
            );
        } catch (error) {
            console.error("Error updating cart:", error);
            setError(true);
            throw error;
        }
    };


  const removeItemFromCart = async (
        productId: number
    ) => {
        const cartItem = findCartItem(productId);

        if (!cartItem) return;

        try {
            await deleteCartItem(cartItem.id);

            const updatedItems = cartItems.filter(
                (item) => item.id !== cartItem.id
            );

            setCartItems(updatedItems);

            sessionStorage.setItem(
                "cartItems",
                JSON.stringify(updatedItems)
            );
        } catch (error) {
            console.error(
                "Error removing cart item:",
                error
            );
            setError(true);
            throw error;
        }
    };

      

 const clearCart = async () => {
  try {
    await clearCartApi();

    setCartItems([]);

    sessionStorage.removeItem("cartItems");
  } catch (error) {
    console.error("Error clearing cart:", error);
    setError(true);
    throw error;
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
        loading,
        error,
        setError,
        fetchCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
