const Footer = () => {
    return (
        <footer className="bg-[#181818] w-[100%] px-20 py-6 text-[#fff] mt-4 grid grid-cols-3">
               <div>
                  <h3 className="font-semibold mb-4">Help</h3>
                  <ul className="text-gray-200 text-sm">
                    <li className="">Returns Policy</li>
                    <li>Start a Return</li>
                    <li>Refund</li>
                    <li>Shopping Info</li>
                    <li>How to Order</li>
                    <li>Track Order</li>
                    <li>Contact Us</li>
                    <li>FAQs</li>

                  </ul>
               </div>

               <div>
                  <h3 className="font-semibold mb-4">Privacy & Legal</h3>
                  <ul className="text-gray-200 text-sm">
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                  </ul>
               </div>

               <div>
                  <h3 className="font-semibold mb-4">Stay Updated</h3>
                  <p className="text-sm font-normal">Subscribe to our newsletter to get latest update about us</p>
                 <div className="mt-8">
                  <input 
                    type="text"
                    className="py-3 px-2 rounded-l-lg text-[#181818] focus:outline-none"  />
                   <button
                      className="bg-[#2ECF5A] py-3 px-2 rounded-r-lg">Subscribe</button>
                 </div>
               </div>
        </footer>

    );
}
 
export default Footer;