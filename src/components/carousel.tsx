import CarouselComponent from "./carouselComponent";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import Carousel1 from "/public/assets/img/carousel/carousel-1.png"
import Carousel2 from "/public/assets/img/carousel/carousel-2.png"
import Carousel3 from "/public/assets/img/carousel/carousel-3.png"
import Carousel4 from "/public/assets/img/carousel/carousel-4.png"
import Carousel5 from "/public/assets/img/carousel/carousel-1.png"
//import { BiSolidDownArrow } from "react-icons/bi";
//import { AiOutlineSearch } from "react-icons/ai";




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
          breakpoint: { max: 1024, min: 775 },
          items: 1,
          slidesToSlide: 1,
        },
        mobile: {
          breakpoint: { max: 775, min: 0 },
          items: 1,
          slidesToSlide: 1,

        }
      };


    return (
        <div className="px-4 lg:px-8 pt-8 mb-12">
          {/* <div className="flex lg:hidden mb-16">
                <div className="bg-[#F3F3F3] flex justify-center items-center w-14 h-10 rounded-bl-md rounded-tl-md">
                    
                    <BiSolidDownArrow size={10}/>
                </div>

                <input type="text" placeholder="Search Alaba Market" className="bg-[#fff] w-full px-3 focus:outline-none"/>

                <div className="bg-[#2ECF5A] w-16 h-10 flex items-center justify-center rounded-br-md rounded-tr-md">
                   <AiOutlineSearch size={20}/>
                </div>
            </div> */}

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
                  dealsAdImage={Carousel1}
                  dealsOffer="LIMITED EDITION"
                  dealsAd="Most popular electronic gadgets"/>

                <CarouselComponent  
                  dealsAdImage={Carousel2}
                  dealsOffer="Up to 50% Off"             
                  dealsAd="Fashion Forward, Budget Friendly!"/>

                <CarouselComponent  
                  dealsAdImage={Carousel3}
                  dealsOffer="Up to 50% Off" 
                  dealsAd="It’s your time to shine"/>

                <CarouselComponent  
                  dealsAdImage={Carousel4}
                  dealsOffer="LIMITED EDITION"
                  dealsAd="Cook in Style, Save with Our Kitchen Deals"/>

                <CarouselComponent  
                  dealsAdImage={Carousel5}
                  dealsOffer="LIMITED EDITION"
                  dealsAd="Stock Up on Food and Save Big!"/>
          </Carousel>   
        </div>     
    );
}
 
export default CarouselSlide;