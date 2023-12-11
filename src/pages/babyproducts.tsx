import Navbar from "../components/navbar";
//import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storeItems from "../database/products.json"
import Products from "../components/products";
import Footer from "../components/footer";
import { FaArrowLeftLong } from "react-icons/fa6";



type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  category: string
  // Add other properties as needed
};

type ProductDisplayProps = {
  products?: Product[];
};

const BabyProducts: React.FC<ProductDisplayProps> = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <div>
        <Navbar/>

        <div>
        <p 
          className="flex items-center ml-6 lg:ml-12 pt-5 underline hover:text-[#2ECF5A]"
            onClick={(e) => {
                e.preventDefault()
                navigate(-1)}}>
                    <FaArrowLeftLong size={15}/>
                  <span className="ml-3">Back</span>
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 place-items-center gap-x-3 lg:gap-x-4 mt-7 mb-24">
            {storeItems.filter(item => item.category === "babyproduct").map(item =>  

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

export default BabyProducts;
