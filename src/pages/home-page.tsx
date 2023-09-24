import CarouselSlide from "../components/carousel";
import HighlyRated from "../categoriess/highly-rated";
import Navbar from "../components/navbar";
import ProductLink from "../components/productLink";
import Footer from "../components/footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <CarouselSlide />
      <ProductLink />
      <HighlyRated />
      <Footer/>
    </div>
  );
};

export default HomePage;
