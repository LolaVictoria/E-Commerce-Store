import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useProduct } from "../contexts/productContext";
import SkeletonProduct from "../components/product/ProductCardSkeleton";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BuyerProductDetails from "../pages/products/ProductDetailsPage";

const AllProducts: React.FC = () => {
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category") || undefined;


  const {
    products,
    loading,
    page,
    setPage,
    totalPages,
    fetchAllProducts,

  } = useProduct();

  useEffect(() => {
    fetchAllProducts(page);
  }, [fetchAllProducts, page, category]);

 
  const handleNextPage = () => {
    if (page < totalPages - 1) {
        setPage(page + 1);
    }
};

const handlePreviousPage = () => {
    if (page > 0) {
        setPage(page - 1);
    }
};


  

  return (
    <div className="px-6 lg:px-12 mt-9 mb-16">
      <h3 className="text-[#000] text-2xl lg:text-3xl font-semibold mb-8">
        All Products
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 place-items-center gap-x-4 my-14">
        {loading
        ? Array(8)
              .fill(0)
              .map((_, index) => (
                  <SkeletonProduct key={index} />
              ))
        : products.map((item) => (
              <BuyerProductDetails
                  key={item.id}
                  {...item}
              />
            ))}
    </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
          <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
              <AiOutlineDoubleLeft />
          </button>

          <span className="flex items-center">
              Page {page + 1} of {totalPages}
          </span>

          <button
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
              <AiOutlineDoubleRight />
          </button>
      </div>
    </div>
  );
};

export default AllProducts;
