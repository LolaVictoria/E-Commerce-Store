const Footer = () => {
    return (
        <footer className="bg-[#181818] w-[100%] px-4 lg:px-16 py-9 text-[#fff] mt-4 grid grid-cols-2 lg:grid-cols-3  gap-y-10">
               <div>
                  <h3 className="font-semibold mb-7">Help</h3>
                  <ul className="text-gray-200 text-sm">
                    <li className="mb-2">Returns Policy</li>
                    <li  className="mb-2">Start a Return</li>
                    <li  className="mb-2">Refund</li>
                    <li  className="mb-2">Shopping Info</li>
                    <li  className="mb-2">How to Order</li>
                    <li  className="mb-2">Track Order</li>
                    <li  className="mb-2">Contact Us</li>
                    <li  className="">FAQs</li>

                  </ul>
               </div>

               <div>
                  <h3 className="font-semibold mb-7">Privacy & Legal</h3>
                  <ul className="text-gray-200 text-sm">
                    <li  className="mb-2">Privacy Policy</li>
                    <li>Terms & Conditions</li>
                  </ul>
               </div>

               <div className="col-span-2 lg:col-span-1">
                  <h3 className="font-semibold mb-7">Stay Updated</h3>
                  <p className="text-md font-normal">Subscribe to our newsletter to get latest update about us</p>
                 <div className="mt-5">
                  <input 
                    type="text"
                    className="py-3 px-2 rounded-l-lg text-[#181818] focus:outline-none"  />
                   <button
                      className="bg-[#2ECF5A] py-3 px-2 rounded-r-lg font-semibold text-[#181818]">Subscribe</button>
                 </div>
               </div>
        </footer>

    );
}
 
export default Footer;