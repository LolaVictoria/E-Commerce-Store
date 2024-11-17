import { useNavigate, useParams } from "react-router-dom";
import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import FavoriteIcon from "/public/assets/img/icons/favorite-icon.png";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useProduct } from "../context/productContext";

type ProductDetails = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string; 
  sellerId: string;
};

type ProductDetailsProps = {
  products?: ProductDetails[] | null;
};

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeItemFromCart,
  } = useShoppingCart();

  
  const product = products?.find((item) => item.id === id);
  const quantity = id ? getItemQuantity(id) : 0;

  useEffect(() => {
    setLoading(false);
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#2ECF5A" size={50} />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-20 text-lg">Product Not Found</div>;
  }

  return (
    <div>
      <Navbar />
      <p
        className="flex items-center ml-6 lg:ml-12 pt-5 underline hover:text-[#2ECF5A] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong size={15} />
        <span className="ml-3">Back</span>
      </p>

      <div className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-x-9 gap-y-7 px-10 lg:px-40">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="px-3">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-2xl">{product.name}</p>
            <img src={FavoriteIcon} alt="Favorite" className="w-6 h-6" />
          </div>

          <div className="mb-4">
            <p className="text-md font-semibold">{product.category}</p>
          </div>
          <div>
            <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
          </div>

          <div className="flex justify-center items-center mb-4">
            {quantity === 0 ? (
              <button
                onClick={() =>
                  increaseCartQuantity({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    img: product.image,
                    category: product.category,
                  })
                }
                className="bg-[#2ECF5A] lg:w-2/4 mt-14 font-semibold text-center py-2 px-6 flex items-center justify-center rounded-lg"
              >
                <span className="mr-2">Add to Cart</span>
                <HiOutlineShoppingCart size={20} />
              </button>
            ) : (
              <div className="flex flex-col items-center mt-14">
                <div className="flex w-40 py-1">
                  <button
                    onClick={() => decreaseCartQuantity(product.id)}
                    className="bg-[#fff] w-[20%] rounded-l-lg"
                  >
                    -
                  </button>
                  <div className="bg-[#2ECF5A] w-[60%] text-center py-1 flex items-center justify-center">
                    <span className="mr-1">{quantity}</span> <span>in cart</span>
                  </div>
                  <button
                    onClick={() =>
                      increaseCartQuantity({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: quantity + 1,
                        img: product.image,
                        category: product.category,
                      })
                    }
                    className="bg-[#fff] w-[20%] rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItemFromCart(product.id)}
                  className="bg-[#fff] w-20 py-1 text-center rounded-b-lg"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
