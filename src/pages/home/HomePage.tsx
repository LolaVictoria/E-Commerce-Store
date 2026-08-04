import HeroCarousel from "../../components/layout/HeroCarousel";
import AllProducts from "../../features/catalog/AllProducts";
import Navbar from "../../components/layout/Navbar";
import ProductCategoryLinks from "../../components/product/ProductCategoryLinks";
import Footer from "../../components/layout/Footer";

const HomePage = () => {

 
  return (
    <div>
      <Navbar />
      <HeroCarousel />
      <ProductCategoryLinks />
      <AllProducts />
      <Footer/>
    </div>
  );
};

export default HomePage;
