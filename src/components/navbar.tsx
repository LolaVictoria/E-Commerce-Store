import Logo from "/assets/img/alaba-market-logo.png";
import { BiSolidDownArrow } from "react-icons/bi";
import {  AiOutlineSearch } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { useShoppingCart } from "../context/shoppingCartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const Navbar: React.FC = () => {
    const { cartItems } = useShoppingCart();
    const { accountType, currentFirstName, currentLastName, businessName } = useAuth();

    // const [nav, setNav] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // const handleNav = () => {
    //     setNav(!nav);
    // };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
        <nav className="bg-[#181818] w-full h-20 lg:h-24 flex justify-between items-center px-1.5 sm:px-8">
            {/* Logo and Mobile Menu Toggle */}
            <div className="flex items-center justify-between w-full lg:w-auto px-4 lg:px-0 py-4">
           <Link to="/">
                <div className="flex items-center text-xl font-bold">
                    <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                    <div>
                        <span className="text-[#2ECF5A]">Alaba </span>
                        <span className="text-[#fff]">Market</span>
                    </div>
                </div>
            </Link>
                {/* <div onClick={handleNav} className="flex lg:hidden text-[#FFF] cursor-pointer">
                    {!nav ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30} />}
                </div> */}
            </div>

            {/* Mobile Search */}
            {/* <div className={`lg:hidden flex flex-col w-full ${nav ? 'block' : 'hidden'} mt-4 px-4`}>
                <div className="flex items-center bg-[#F3F3F3] rounded-md overflow-hidden">
                    <div className="flex items-center justify-center w-12 h-10 bg-gray-300">
                        <BiSolidDownArrow size={10} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Alaba Market"
                        className="w-full bg-white px-3 py-2 focus:outline-none"
                    />
                    <div className="flex items-center justify-center w-12 h-10 bg-[#2ECF5A]">
                        <AiOutlineSearch size={20} />
                    </div>
                </div>
            </div> */}

            {/* Large Screen Search and Shopping Cart */}
            <div className="hidden lg:flex items-center w-[40%]">
                <div className="flex items-center bg-[#F3F3F3] rounded-md overflow-hidden w-full">
                    <div className="flex items-center justify-center w-12 h-10 bg-gray-300">
                        <BiSolidDownArrow size={10} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Alaba Market"
                        className="w-full bg-white px-3 py-2 focus:outline-none"
                    />
                    <Link to="/search-results">
                        <div className="flex items-center justify-center w-16 h-10 bg-[#2ECF5A] cursor-pointer">
                            <AiOutlineSearch size={20} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Right Section (Shopping Cart and Account) */}
            <div className="flex items-center text-white space-x-2 sm:space-x-8">
                {/* Shopping Cart (Visible on all screen sizes) */}
              {currentFirstName && currentLastName && businessName &&
                <Link to="/shoppingcart" className="">
                <div className="relative">
                    
                    <HiShoppingCart size={30} />
                   
                        <div className="bg-[#2ECF5A] text-[#181818] text-xs rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                            {cartItems.length}
                        </div>
                  
                    </div>
                </Link>}

                {/* Account Info and Dropdown (Visible only on large screens) */}
                <div className="hidden lg:flex items-center">
                    <FiGlobe size={30} className="mr-2" />
                    <div className="text-center">
                        <p className="text-sm">We Deliver</p>
                        <p className="text-lg font-semibold">Globally</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                        <BsPersonCircle size={30} className="mr-2" />
                        <div className="flex items-center">
                            <p className="text-base">{currentFirstName ? currentFirstName : "Account"}</p>
                            <BiSolidDownArrow className="ml-1" />
                        </div>
                    </div>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 z-50 bg-[#2ECF5A] text-[#181818] rounded-md shadow-lg p-4 w-48 animate-slide-down">
                            <ul className="space-y-2">
                                {accountType === "seller" ? (
                                    <>
                                        <Link to="/seller-dashboard" state={{ currentFirstName, currentLastName, businessName }}>
                                            <li className="border-b border-[#181818] py-2">Seller's Dashboard</li>
                                        </Link>
                                        <Link to="/settings">
                                            <li className="border-b border-[#181818] py-2">Settings</li>
                                        </Link>
                                        <li className="py-2">Logout</li>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/signup">
                                            <li className="border-b border-[#181818] py-2">Create Account</li>
                                        </Link>
                                        <Link to="/login">
                                            <li className="py-2">Login</li>
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>

        <div>
        <div className="lg:hidden flex items-center mx-auto w-[80%] mt-4">
                <div className="flex items-center bg-[#F3F3F3] rounded-md overflow-hidden w-full">
                    <div className="flex items-center justify-center w-12 h-10 bg-gray-300">
                        <BiSolidDownArrow size={10} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Alaba Market"
                        className="w-full bg-white px-3 py-2 focus:outline-none"
                    />
                    <Link to="/search-results">
                        <div className="flex items-center justify-center w-16 h-10 bg-[#2ECF5A] cursor-pointer">
                            <AiOutlineSearch size={20} />
                        </div>
                    </Link>
                </div>
            </div>


        </div>
        </>
    );
};

export default Navbar;
