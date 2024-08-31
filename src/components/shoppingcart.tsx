import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/shoppingCartContext";
import CartItem from "./cartitem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../database/products.json";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the spinner

const ShoppingCart = () => {
    const { cartItems, clearCart } = useShoppingCart();
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false); // Ensure loading state is updated even if the cart is empty
    }, [cartItems]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#2ECF5A" size={50} /> {/* Spinner */}
            </div>
        );
    }

    return (
        <div className="py-7 px-10">
            <div>
                <p
                    className="flex items-center underline hover:text-[#2ECF5A]"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}>
                    <FaArrowLeftLong size={15} />
                    <span className="ml-3">Back</span>
                </p>

                <h3 className="text-[#2ECF5A] text-4xl font-bold text-center mt-8 tracking-wider">
                    Cart
                </h3>
            </div>

            <div className="w-auto grid gap-y-10 lg:gap-y-6">
                {cartItems.length === 0
                    ? <p className="mt-5 text-lg">You have not added any item to cart</p>
                    : <p className="text-center">You added {cartItems.length} items to cart</p>}
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
                
                <div className="flex justify-start">
                {cartItems.length !==  0 ?
                <div 
                onClick={clearCart}
                className="py-2 px-3 bg-red-500 text-[#fff] rounded-lg w-auto overflow-x-hidden">

                    <p>Clear all cart items</p> 
                </div>
                : ""}
                </div>

                {cartItems.length !== 0 &&
                    <div className="py-5 font-bold text-xl">
                        Total {" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id);
                                return total + (item?.price || 0) * cartItem.quantity;
                            }, 0)
                        )}
                    </div>}
            </div>
        </div>
    );
};

export default ShoppingCart;
