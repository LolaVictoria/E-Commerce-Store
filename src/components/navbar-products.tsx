//import Logo from ".alaba-market-logo.png"
import {BiSolidDownArrow} from "react-icons/bi"
import {AiOutlineSearch} from "react-icons/ai";
import {FiGlobe} from "react-icons/fi";
import {HiShoppingCart} from "react-icons/hi"
import {BsPersonCircle} from "react-icons/bs"
// import {BsFillHeartFill}  from "react-icons/bs"
// import {RiHome2Line} from "react-icons/ri"
// import {BsPhone} from "react-icons/bs"
// import {MdComputer} from "react-icons/md"
// import {PiTelevisionSimple} from "react-icons/pi"
// import {LuBaby} from "react-icons/lu"


const NavbarProducts = () => {
    return (
        <nav className="bg-[#181818] w-[100%] h-24 flex justify-between items-center px-8">
            <div className="flex flex-row items-center text-xl font-bold tracking-[-1.296px]">
                <img src="src/assets/img/alaba-market-logo.png" className="mr-3"/>
                <div>
                    <span className="text-[#2ECF5A]">Alaba </span><span className="text-[#fff]">Market</span>
                </div>
            </div>

            <div className="flex max-h-10 w-[50%]">
                <div className="bg-[#F3F3F3] flex justify-center items-center w-14 h-10 rounded-bl-md rounded-tl-md">
                    <select className="text-[#666] text-xs font-medium outline-none w-full ">
                        <option className="">All</option>
                        <option>Health & Beauty</option>
                        <option >Home & Office</option>
                        <option>Appliances</option>
                        <option>Phones & Tablets</option>
                        <option>Computing</option>
                        <option>Electronics</option>
                        <option>Thrift (Okirika)</option>
                        <option>Baby Product</option>
                    </select>
                    <BiSolidDownArrow size={10}/>
                </div>

                <input type="text" placeholder="Search Alaba Market" className="bg-[#fff] w-full px-3"/>

                <div className="bg-[#2ECF5A] w-16 h-10 flex items-center justify-center rounded-br-md rounded-tr-md">
                   <AiOutlineSearch size={20}/>
                </div>
            </div>

            <div className="text-white flex flex-row justify-between items-center mx-5">
                <div className="flex items-center justify-center mr-5">
                    <FiGlobe size={30} className="mr-1"/>
                    <div className="flex flex-col justify-center items-center relative mb-4">
                        <p className="text-sm font-normal tracking-[-0.667px]">We Deliver</p>
                        <p className="text-lg font-semibold tracking-[1.007px] absolute top-2.5 left-0">Globally</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mr-5">
                        <div className="relative">                  
                            <HiShoppingCart size={30} />
                           <div className="bg-[#2ECF5A] rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                              <p className="text-xs text-[#181818]">0</p>
                           </div>
                        </div>
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
 
export default NavbarProducts;