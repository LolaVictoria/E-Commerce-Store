import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HealthAndBeauty from "./pages/health&beauty";
import HomeAndOffice from "./pages/home&offices";
import Appliances from "./pages/appliances";
import HomePage from "./pages/home-page";
//import ShoppingCart from "./components/shoppingcart"
import PhoneAndtablets from "./pages/phones&tablets";
import Computing from "./pages/computing";
import Electronics from "./pages/electronics";
import Clothes from "./pages/clothes";
import BabyProduct from "./pages/babyproducts";
import ProductDetails from "./pages/productdetails";
import { ShoppingCartProvider } from "./context/shoppingCartContext"
import "./index.css"
import ShoppingCart from "./components/shoppingcart";

const App = () => {
  return ( 
    <Router>
      <ShoppingCartProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
         <Route path="/health_&_beauty" element={<HealthAndBeauty />} />
          <Route path="/home_&_office" element={<HomeAndOffice />} /> 
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/phones_&_tablets" element={<PhoneAndtablets />} />
          <Route path="/computing" element={<Computing />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothes" element={<Clothes/> } />
        <Route path="/babyproduct" element={<BabyProduct/> } />
          <Route path="/productdetails/:id" element={<ProductDetails/> } /> 
         
          <Route path="/shoppingcart" element={<ShoppingCart/>}/>
        </Routes>
      </div>
    </ShoppingCartProvider>
    </Router>
  );
};

export default App;
