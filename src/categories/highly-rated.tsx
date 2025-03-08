import { useState } from "react";
import Products from "../components/products";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useProduct } from "../context/productContext";
import SkeletonProduct from "../components/skeletonProduct";

// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   img: string;
//   ratings: number;
//   category: string;
// };

type productObj = {
  id: string; 
  name: string; 
  category: string; 
  price: number; 
  description: string; 
  image: string; 
  sellerId: string;
}

const HighlyRated: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {products, loading} = useProduct()
  const postsPerPage = 4;

  
const getRandomProducts = (products: productObj[], count = 18) => {
 
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
  
 
  return shuffledProducts.slice(0, count);
};

// Usage
const highlyRatedItems = getRandomProducts(products);

  
 // const highlyRatedItems = products.filter((item) => (item.ratings || 0) >= 2.5);

  // Pagination calculations
  const totalPosts = highlyRatedItems.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = highlyRatedItems.slice(firstPostIndex, lastPostIndex);

 
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

 
  const paginationRange = () => {
    const delta = 2; 
    const range = [];
    const rangeWithDots = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

  
    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (left > 2) {
      rangeWithDots.push(1, '...');
    } else if (left === 2) {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    
    if (right < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (right === totalPages - 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="px-6 lg:px-12 mt-9 mb-16">
      <h3 className="text-[#000] text-2xl text-left lg:text-3xl font-semibold mb-8">
        Highly Rated Products
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 place-items-center gap-x-4 my-14">
      {loading
        ? Array(4).fill(0).map((_, index) => <SkeletonProduct key={index} />)
        : currentPosts.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <Products {...item} />
            </div>
          ))}
    </div>

      {/* Pagination Controls */}
      {loading ? ""
      : <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <AiOutlineDoubleLeft size={20} />
        </button>

        {paginationRange().map((page, index) =>
          page === '...' ? (
            <span key={index} className="px-3 py-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageClick(Number(page))}
              className={`px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
           <AiOutlineDoubleRight size={20} />
        </button>
      </div>}
    </div>
  );
};

export default HighlyRated;
