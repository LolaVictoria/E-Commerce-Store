import { useState } from "react";
import Products from "../components/products";
import storeItems from "../database/products.json"
import Paginate from "./paginate";

type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  ratings: number
  category: string
  // Add other properties as needed
};

type HighlyRatedType = {
  highlyRatedItems?: Product[];
};


const HighlyRated: React.FC<HighlyRatedType> = ( ) => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

  
  // Filter highly-rated items before rendering
  const highlyRatedItems = storeItems.filter((item) => (item.ratings || 0) >= 2.5);
  
  //Pagination
  const lastPostIndex = currentPage * postsPerPage 
  const firstPostIndex = lastPostIndex - postsPerPage 
  const currentPosts = highlyRatedItems.slice(firstPostIndex, lastPostIndex)
    return (
      
      <div className="px-6 lg:px-12 mt-9 mb-16">
            <h3 className="text-[#000] text-2xl text-left lg:text-3xl font-semibold mb-8">Highly Rated Products</h3>

            
            <div className="grid grid-cols-2 lg:grid-cols-4  gap-y-14 place-items-center gap-x-4 my-14">
            {currentPosts.map((item) => (
          <div key={item.id} className="">
            <Products {...item} />
          </div>
        ))}
            
        </div>
          
         <Paginate 
           totalPosts={highlyRatedItems.length} 
           postPerPage={postsPerPage}
           setCurrentPage={setCurrentPage}
           currentPage={currentPage}/>
           </div>
    );
}
 
export default HighlyRated;