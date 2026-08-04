import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import { ShoppingCartProvider } from "./contexts/shoppingCartContext";
import "./index.css";
import ShoppingCart from "./components/cart/ShoppingCart";
import SignUp from "./pages/auth/SignUpPage";
import Login from "./pages/auth/LoginPage";
import { AuthProvider } from "./contexts/authContext";
import SellerDashboard from "./pages/seller/SellerDashboardPage";
import { ProductProvider } from "./contexts/productContext";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";
import Orders from "./pages/seller/OrdersPage";
import SellerOrders from "./pages/seller/SellerOrdersPage";
import NotFound from "./pages/errors/NotFoundPage";
import Purchases from "./pages/account/PurchasesPage";
import SellerProfileForm from "./pages/seller/SellerProfileFormPage";
import SellerProfile from "./pages/seller/SellerProfilePage";

const App = () => {
  return (
      <AuthProvider>
        <ProductProvider>
          <ShoppingCartProvider>
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/productdetails/:id" element={<ProductDetailsPage />} />
              

              {/* Protected Routes */}
              
              <Route
                path="/seller-profile-form"
                element={
                  <ProtectedRoute>
                    <SellerProfileForm />
                  </ProtectedRoute>
                }
              />



              <Route
                  path="/seller-dashboard"
                  element={
                      <RoleProtectedRoute allowedRoles={["SELLER"]}>
                          <SellerDashboard />
                      </RoleProtectedRoute>
                  }
              />

              <Route
                path="/shoppingcart"
                element={
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />

              <Route
                  path="/sellersproduct"
                  element={
                      <RoleProtectedRoute allowedRoles={["SELLER"]}>
                          <SellerProductsPage />
                      </RoleProtectedRoute>
                  }
              />

              <Route
                  path="/seller-profile"
                  element={
                      <RoleProtectedRoute allowedRoles={["SELLER"]}>
                          <SellerProfile />
                      </RoleProtectedRoute>
                  }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />



              {/* <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              /> */}

              <Route
                path="/purchases"
                element={
                  <ProtectedRoute>
                    <Purchases />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/seller/orders"
                element={
                    <RoleProtectedRoute allowedRoles={["SELLER"]}>
                        <SellerOrders />
                    </RoleProtectedRoute>
                }
            />

            

            <Route path="*" element={<NotFound />} />
              {/* <Route
                  path="/checkout"
                  element={
                      <RoleProtectedRoute allowedRoles={["BUYER"]}>
                          <Checkout />
                      </RoleProtectedRoute>
                  }
              /> */}

              {/* <Route
                  path="/admin"
                  element={
                      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                          <AdminDashboard />
                      </RoleProtectedRoute>
                  }
              /> */}
            </Routes>
          </ShoppingCartProvider>
        </ProductProvider>
      </AuthProvider>
  );
};

export default App;
