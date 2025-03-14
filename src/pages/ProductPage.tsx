import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Products from "../components/products";
import Footer from "../components/footer";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useProduct } from "../context/productContext";
import { ClipLoader } from "react-spinners";

type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  category: string;
};

type ProductDisplayProps = {
  products?: Product[];
};

const ProductsPage: React.FC<ProductDisplayProps> = () => {
  const navigate = useNavigate();
  const { products, loading } = useProduct();
  console.log(products);
  
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); 

  const filteredProducts = products.filter((item) => {
    switch (category) {
      case "Appliances":
        return item.category === "Appliances";
      case "Electronics":
        return item.category === "Electronics";
      case "Home & Office":
        return item.category === "Home & Office";
      case "Baby Products":
        return item.category === "Baby Product";
      case "Computing":
        return item.category === "Computing";
      case "Health & Beauty":
        return item.category === "Health_Beauty";
      case "Phones & Tablets":
        return item.category === "Phones & Tablets";
      case "Clothes":
        return item.category === "Thrift(Okirika)";
      default:
        return true;
    }
  });

  return (
    <>
      <Navbar />
      <div>
        <p
          className="flex items-center ml-6 lg:ml-12 pt-5 underline hover:text-[#2ECF5A] cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <FaArrowLeftLong size={15} />
          <span className="ml-3">Back</span>
        </p>
  
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#2ECF5A" size={50} /> 
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 place-items-center gap-x-3 lg:gap-x-4 mt-7 mb-24">
            {filteredProducts.map((item) => (
              <div key={item.id}>
                <Products {...item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-10 text-red-500">
            No products found for <strong>{category}</strong>.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
  
};

export default ProductsPage;
