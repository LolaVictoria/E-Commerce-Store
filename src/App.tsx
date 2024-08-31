import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HealthAndBeauty from "./pages/health&beauty";
import HomeAndOffice from "./pages/home&offices";
import Appliances from "./pages/appliances";
import HomePage from "./pages/home-page";
import PhoneAndtablets from "./pages/phones&tablets";
import Computing from "./pages/computing";
import Electronics from "./pages/electronics";
import Clothes from "./pages/clothes";
import BabyProduct from "./pages/babyproducts";
import ProductDetails from "./pages/productdetails";
import { ShoppingCartProvider } from "./context/shoppingCartContext"
import "./index.css"
import ShoppingCart from "./components/shoppingcart";
import SignUp from "./pages/auth/signUp";
import Login from "./pages/auth/login";
import { AuthProvider } from "./context/authContext";
import CompleteProfile from "./pages/auth/completeProfile";
import SellerDashboard from "./pages/sellerDashoard";
import { ProductProvider } from "./context/productContext";
import SellersProduct from "./pages/sellersProduct";

const App = () => {
  return ( 
    <Router>
      <AuthProvider>
      <ProductProvider>
      <ShoppingCartProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/complete-profile" element={<CompleteProfile/>}/>
          <Route path="/seller-dashboard" element={<SellerDashboard/>}/>
          <Route path="/shoppingcart" element={<ShoppingCart/>}/>
         <Route path="/health_&_beauty" element={<HealthAndBeauty />} />
          <Route path="/home_&_office" element={<HomeAndOffice />} /> 
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/phones_&_tablets" element={<PhoneAndtablets />} />
          <Route path="/computing" element={<Computing />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothes" element={<Clothes/> } />
        <Route path="/babyproduct" element={<BabyProduct/> } />
          <Route path="/productdetails/:id" element={<ProductDetails/> } />     
          <Route path="/sellersproduct" element={<SellersProduct/> } /> 
        </Routes>
      </div>
    </ShoppingCartProvider>
    </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
