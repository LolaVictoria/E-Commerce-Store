import CarouselComponent from "./carouselComponent";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const CarouselSlide = () => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
          slidesToSlide: 2,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2,
          slidesToSlide: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1,

        }
      };


    return (
        <div className="px-8 pt-8 mb-12">
            <h3 className="text-[#000] text-3xl font-semibold mb-8">Featured Deals</h3>

                            {/* carousel */}
           <Carousel 
              responsive={responsive} 
              showDots={true}  
              swipeable={true}
              draggable={true}
              keyBoardControl={true}
              >
               
                <CarouselComponent  
                  dealsAdImage="src/assets/img/carousel/carousel-1.png"
                  dealsOffer="LIMITED EDITION"
                  dealsAd="Most popular electronic gadgets"/>

                <CarouselComponent  
                  dealsAdImage="src/assets/img/carousel/carousel-2.png"
                  dealsOffer="Up to 50% Off"             
                  dealsAd="Fashion Forward, Budget Friendly!"/>

                <CarouselComponent  
                  dealsAdImage="src/assets/img/carousel/carousel-3.png"
                  dealsOffer="Up to 50% Off" 
                  dealsAd="It’s your time to shine"/>

                <CarouselComponent  
                  dealsAdImage="src/assets/img/carousel/carousel-4.png"
                  dealsOffer="LIMITED EDITION"
                  dealsAd="Cook in Style, Save with Our Kitchen Deals"/>

                <CarouselComponent  
                  dealsAdImage="src/assets/img/carousel/carousel-5.png"
                  dealsOffer="LIMITED EDITION"
                  dealsAd="Stock Up on Food and Save Big!"/>
          </Carousel>   
        </div>     
    );
}
 
export default CarouselSlide;