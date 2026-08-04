import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useProduct } from "../../contexts/productContext";
import { ProductCategory, ProductResponse } from "../../types/product";
import { Spinner } from "../../components/ui/Spinner";
import { categories } from "../../utils/categories";
import { useEffect } from "react";
import BuyerProductDetails from "../products/ProductDetailsPage";



type ProductDisplayProps = {
  products?: ProductResponse[];
};

const ProductsPage: React.FC<ProductDisplayProps> = () => {
  const navigate = useNavigate();
  const { fetchAllProducts, loading, products } = useProduct();
  
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); 
  const selectedCategory = categories.find(
      (c) => c.value === category
  );

    useEffect(() => {
    fetchAllProducts(
        0,
        category as ProductCategory | undefined
    );
}, [category]);

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
            <Spinner />
          ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 place-items-center gap-x-3 lg:gap-x-4 mt-7 mb-24">
                  {products.map((product) => (
                      <BuyerProductDetails
                          key={product.id}
                          {...product}
                      />
                  ))}
              </div>
          ) : (
              <p className="text-center text-lg mt-10 text-red-500">
                  No products found for{" "}
                  <strong>{selectedCategory?.label}</strong>.
              </p>
          )}
      </div>
      <Footer />
    </>
  );
  
};

export default ProductsPage;
