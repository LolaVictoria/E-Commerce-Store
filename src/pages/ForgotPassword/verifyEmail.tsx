import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Logo from "/assets/img/alaba-market-logo.png";
import { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "../../firebase";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [ErrorFlag, setErrorFlag] = useState<boolean>(false)
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get("oobCode");
    const emailVerification = searchParams.get("mode") === "verifyEmail" && oobCode

    useEffect(()=>{
        const verifyUser = async()=>{
        if(emailVerification){
          await applyActionCode(auth, oobCode)
          .then(() => {
          })
          .catch((error) => {
            if (error.code === "auth/expired-action-code") {
              setErrorFlag(true);
            } else if (error.code === "auth/invalid-action-code") {
              setErrorFlag(true);
            } else {
              setErrorFlag(true);
            }
          });
        }
      }
      verifyUser();
      },[emailVerification, oobCode])
    
    
    return (
        <div className="min-h-screen bg-[#2ECF5A]">
            <div className="bg-[#181818] py-4 lg:py-7 px-2 sm:px-6 text-[#fff] lg:grid lg:grid-cols-3 ">
               <Link to="/">
                <div className="flex items-center justify-center text-xl font-bold lg:col-span-1">
                    <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                    <div>
                        <span className="text-[#2ECF5A]">Alaba </span>
                        <span className="text-[#fff]">Market</span>
                    </div>
                </div>
                </Link>
                {/* <h2 className="text-2xl font-bold sm:text-center lg:text-justify mt-3 lg:mt-0 sm:col-span-2">Welcome, {currentFirstName} {currentLastName}</h2> */}
               
            </div>

            <div className="bg-white border border-[#181818] lg:w-[30%] rounded-xl py-3 px-5">
            <label className="text-base font-normal text-[#3f3f3f] block mt-3 mb-3">{ErrorFlag ? "Verification code has expired, please sign up with another account" : "Your email has been successfully verified. Please proceed to login."}</label>
            <button
            className="w-3/4 mx-auto border border-[#fe5a1d] text-[#ffff] bg-[#fe5a1d] font-semibold rounded-full py-3 p mt-4"
            onClick={()=>{navigate("/login")}}
          >
            Proceed to Login
          </button>
            </div>
        </div>

    )
}
export default VerifyEmail