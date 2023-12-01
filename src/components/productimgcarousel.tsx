
import ProductImg from './productimg';
//import {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import storeItems from "../database/products.json"




const ProductImgDisplay= () => {

      const {id} = useParams()
      const product = storeItems.find((item) => item.id === Number(id));

if (!product) {
  return <div>Product Not Found</div>;
}
      

    return (
        <div>    
          <ProductImg productDetailsImg={product.img}/>
                
        </div>     
    );
}
 
export default ProductImgDisplay;