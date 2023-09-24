import { createContext, useContext, useState, ReactNode } from "react";
import ShoppingCart from "../components/shoppingcart";
//import { useLocalStorage } from "../hooks/useLocalStorage";


type CartItem = {
    id: number 
    quantity: number
}
type ShoppingCartContext = {
    isClose: boolean
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    
}

const ShoppingCartContext = createContext<ShoppingCartContext| undefined>(undefined)

export const ShoppingCartProvider: React.FC< {children: ReactNode} > = ({children}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>( []);
    const [isClose, setIsClose] = useState(false)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )
     
    const openCart= () => { 
        console.log("cart is opened")
        setIsClose(!isClose) }
    const closeCart = () => {
        console.log("cart is closed")
        setIsClose(!isClose)}

        
    function getItemQuantity(id: number ) {
        return cartItems.find(item => item.id === id) ?.quantity || 0
    }  
    {/*if the item returns to something, get the quantity item else return 0 if we have nothing*/}

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems((currItems) => currItems.filter(item => item.id !== id))
    } 

    



    return (
    <ShoppingCartContext.Provider value={{ isClose, cartQuantity,openCart, closeCart, cartItems, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}>
        {children}
        <ShoppingCart/>
    </ShoppingCartContext.Provider>
    )
}

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if(!context) {
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider")
    }
    return context
}

