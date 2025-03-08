import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductDetails from "./pages/productdetails";
import { ShoppingCartProvider } from "./context/shoppingCartContext"
import "./index.css"
import ShoppingCart from "./components/shoppingcart";
import SignUp from "./pages/auth/signUp";
import Login from "./pages/auth/login";
import { AuthProvider } from "./context/authContext";
import CompleteProfile from "./pages/auth/completeProfile";
import SellerDashboard from "./pages/sellersDashboard";
import { ProductProvider } from "./context/productContext";
import SellersProduct from "./pages/sellersProduct";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";
import ResetPassword from "./pages/ForgotPassword/resetPassword";
import VerifyEmail from "./pages/ForgotPassword/verifyEmail";
import ProductsPage from "./pages/ProductPage";

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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/productdetails/:id" element={<ProductDetails/> } />     
          <Route path="/sellersproduct" element={<SellersProduct/> } /> 
          <Route path="/forgot-password" element={<ForgotPassword/> } /> 
          <Route path="/reset-password" element={<ResetPassword/> } /> 
          <Route path="/verifyemail" element={<VerifyEmail/> } /> 
        </Routes>
      </div>
    </ShoppingCartProvider>
    </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
