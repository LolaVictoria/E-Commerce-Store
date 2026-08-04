import { useShoppingCart } from "../../contexts/shoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/Spinner";

const ShoppingCart = () => {
    const { cartItems, clearCart, loading } = useShoppingCart();
    const navigate = useNavigate();
   

    if (loading) {
        return (
            <Spinner />
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

                <h3 className="text-[#2ECF5A] text-4xl font-bold text-center mt-8 mb-4 tracking-wider">
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
                            cartItems.reduce((total, cartItem) => 
                                total + cartItem.priceAtTime * cartItem.quantity,
                             0)
                        )}
                    </div>}
            </div>
        </div>
    );
};

export default ShoppingCart;
