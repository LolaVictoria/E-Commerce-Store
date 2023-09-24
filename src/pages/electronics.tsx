import Navbar from "../components/navbar";
//import { useState, useEffect } from "react";

import storeItems from "../database/products.json"
import Products from "../components/products";
import Footer from "../components/footer";



type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  category: string
  // Add other properties as needed
};

type ProductDisplayProps = {
  products: Product[];
};

const Electronics: React.FC<ProductDisplayProps> = () => {
  
  
  return (
    <>
      <div>
        <Navbar/>

        <div>
          
          <div className="grid grid-cols-4 gap-y-14 place-items-center gap-x-4 my-24">
            {storeItems.filter(item => item.category === "Electronics").map(item =>  

              <div key={item.id} className="">
                
                 <Products {...item} />

              </div>
            

            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Electronics;
