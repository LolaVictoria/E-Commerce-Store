
import Logo from "/assets/img/alaba-market-logo.png"
import {BiSolidDownArrow} from "react-icons/bi"
import {AiOutlineClose, AiOutlineMenu, AiOutlineSearch} from "react-icons/ai";
import {FiGlobe} from "react-icons/fi";
import {HiShoppingCart} from "react-icons/hi"
import {BsPersonCircle} from "react-icons/bs"
import { useShoppingCart } from "../context/shoppingCartContext";
import { Link} from "react-router-dom";
import { useState } from "react"
//import storeItems from "../database/products.json"





const Navbar = () => {
    const { cartQuantity} = useShoppingCart()
    const [nav, setNav] = useState(false);
    //const [input, setInput] = useState("")

    const handleNav = () => {
        setNav(!nav);
      };

    //   function countOccurrences(text, pattern) {
    //     const regex = new RegExp(pattern, 'g');
    //     const matches = text.match(regex);
        
    //     matches ? matches.length : 0;

    //     return true
    //     //return matches ? matches.length : 0;
    //   }
    //   //countOccurrences("lolol", "lol");

    //   const searchKeyword =  storeItems.map(item => item.category)

    //   const handleSearch = (e) => {
    //       setInput(e.target.value)
    //       countOccurrences(searchKeyword, input)    
     // }

    return (
        <nav className="lg:bg-[#181818] w-full lg:h-24 flex justify-between items-center  lg:px-8">
        <div className="grid grid-cols-1">
            <div className="bg-[#181818] flex justify-between px-4 lg:px-0 py-4">
            <div className="flex  items-center text-xl font-bold tracking-[-1.296px]">
                <img src={Logo} className="mr-3"/>
                <div>
                    <span className="text-[#2ECF5A]">Alaba </span><span className="text-[#fff]">Market</span>
                </div>
            </div>
            
            <div onClick={handleNav} className=" flex lg:hidden text-[#FFF]">
               {!nav 
                 ? <AiOutlineMenu size={30} /> 
                 : <AiOutlineClose size={30} />}
           </div>
          </div>
           <div className="col-span-2 flex lg:hidden mt-10 px-4 lg:px-0">
                <div className="bg-[#F3F3F3] border-2 border-t-[#F3F3F3] border-b-[#F3F3F3] border-r-transparent flex justify-center items-center w-14 h-10 rounded-bl-md rounded-tl-md">
                    
                    <BiSolidDownArrow size={10}/>
                </div>

                <input type="text" placeholder="Search Alaba Market" className="bg-[#fff] border-2 border-t-[#181818] border-b-[#181818] w-full px-3 focus:outline-none"/>

                <div className="bg-[#2ECF5A] border-2 border-b-[#2ECF5A] border-t-[#2ECF5A] border-l-transparent w-16 h-10 flex items-center justify-center rounded-br-md rounded-tr-md">
                   <AiOutlineSearch size={20}/>
                </div>
            </div>
            </div>
           
            {/* beginning of dropdown menu for smaller screens */}

            <div
               className={
                 nav
                   ? "fixed z-10 text-xl top-0 bg-[#181818] left-0 w-full h-full pb-7"
                   : "fixed top-[100%] hidden"
               }>

                <div
                   className="flex justify-end text-[#fff] mt-6 mx-4" 
                   onClick={handleNav}>
                  {!nav ? (
                    <AiOutlineMenu size={30} />
                  ) : (
                   <AiOutlineClose size={30} />
                   )}
                </div>
                
                <div className="py-16">
                
                    <ul className="flex flex-col gap-y-7 px-10">

                        <li>
                         <div className="flex items-center  text-[#fff] mr-5">
                           <FiGlobe size={30} className="mr-3"/>
                           <div className="flex flex-col justify-center items-center relative mb-4">
                              <p className="text-sm font-normal tracking-[-0.667px]">We Deliver</p>
                              <p className="text-lg font-semibold tracking-[1.007px] absolute top-2.5 left-0">Globally</p>
                           </div>
                          </div>
                        </li>

                        <li className="">
                            <Link to="/shoppingcart">  
                            <div className="flex">
                            <span className="mr-2">
                              <button                     
                                className="relative  text-[#fff] text-md ">
                                   <HiShoppingCart size={30} />
                                  <div className="bg-[#2ECF5A] rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                                    <p className="text-xs text-[#181818]">
                                       {cartQuantity}
                                   </p>
                                </div>
                             </button>
                            </span>
                           <p className="text-[#fff]">Shopping Cart</p>
                            </div>
                           </Link> 
                        </li>

                        <li className="">
                           <div className="flex text-[#fff]">
                           <span className="mr-3">
                               <BsPersonCircle size={30} />
                            </span>
                            Account
                           </div>
                        </li>
                    </ul>


                </div>
                </div>
            

            
            
            
            {/*beginning of navbar for large screens*/}
            <div className="hidden lg:flex max-h-10 w-[50%]">
                <div className="bg-[#F3F3F3] flex justify-center items-center w-14 h-10 rounded-bl-md rounded-tl-md">
                    
                    <BiSolidDownArrow size={10}/>
                </div>

                <input
                //    value={input}
                //    onChange={handleSearch} 
                   type="text" placeholder="Search Alaba Market" className="bg-[#fff] w-2/4 lg:w-full px-3 focus:outline-none"/>
                
                <Link to="/`${searchKeyword}`">

                <div 
                //    onClick={() => console.log(searchKeyword)}
                  className="bg-[#2ECF5A] w-16 h-10 flex items-center justify-center rounded-br-md rounded-tr-md">
                   <AiOutlineSearch size={20}/>
                </div>
                </Link>
            </div>

            <div className="hidden lg:flex text-white flex flex-row justify-between items-center mr-5">
                <div className="flex items-center justify-center mr-5">
                    <FiGlobe size={30} className="mr-1"/>
                    <div className="flex flex-col justify-center items-center relative mb-4">
                        <p className="text-sm font-normal tracking-[-0.667px]">We Deliver</p>
                        <p className="text-lg font-semibold tracking-[1.007px] absolute top-2.5 left-0">Globally</p>
                    </div>
                </div>
                <div className="hidden lg:flex flex-row justify-between items-center mr-3">
                        
                    <Link to="/shoppingcart">  
                        <button                     
                            className="relative  p-2">
                            <HiShoppingCart size={30} />
                            <div className="bg-[#2ECF5A] rounded-full w-4 h-4 flex items-center justify-center absolute top-1 right-1">
                                <p className="text-xs text-[#181818]">
                                   {cartQuantity}
                                </p>
                            </div>
                        </button>
                    </Link>                
                            
                </div>
              
    
                <div className="flex flex-row items-center">
                    <BsPersonCircle size={30} className="mr-2"/>
                    <div className="flex flex-row justify-between items-center w-12 h-10 text-white">
                        <p className="text-[#fff] text-base font-normal mr-1">Account</p>
                         <img src="src/assets/img/icons/soliddownarrow-white.png" className="w-3 h-3"/>
                    </div>
                </div>
            
            </div>
        </nav>
    );
}
 
export default Navbar;