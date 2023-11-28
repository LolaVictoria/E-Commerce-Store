import Navbar from "../components/navbar";
//import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storeItems from "../database/products.json"
import Products from "../components/products";
import Footer from "../components/footer";
import { AiOutlineCloseSquare } from "react-icons/ai";


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

const Appliances: React.FC<ProductDisplayProps> = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <div>
        <Navbar/>

        <div>
        <div
           className="ml-12 pt-8" 
            onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}>
            <AiOutlineCloseSquare size={40} />
          </div>

          <div className="grid grid-cols-4 gap-y-14 place-items-center gap-x-4 mt-7 mb-24">
            {storeItems.filter(item => item.category === "Appliances").map(item =>  

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

export default Appliances;
