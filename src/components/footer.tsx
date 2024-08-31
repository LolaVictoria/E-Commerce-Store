//import React, { useState } from 'react';
//import axios from 'axios'; // Assuming you'll use axios to make API requests

const Footer = () => {
    // const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');
    // const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     setMessage('');

    //     try {
    //         // Replace this URL with the endpoint of your newsletter subscription API
    //         const response = await axios.post('/api/subscribe', { email });

    //         if (response.status === 200) {
    //             setMessage('Subscription successful! Thank you for subscribing.');
    //             setEmail('');
    //         } else {
    //             setMessage('An error occurred. Please try again.');
    //         }
    //     } catch (error) {
    //         setMessage('An error occurred. Please try again.');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <footer className="bg-[#181818] w-[100%] px-4 lg:px-16 py-9 text-[#fff] mt-4 grid grid-cols-2 lg:grid-cols-3  gap-y-10">
            <div>
                <h3 className="font-semibold mb-2 sm:mb-7">Help</h3>
                <ul className="text-gray-200 text-sm">
                    <li className="mb-2">Returns Policy</li>
                    <li className="mb-2">Start a Return</li>
                    <li className="mb-2">Refund</li>
                    <li className="mb-2">Shopping Info</li>
                    <li className="mb-2">How to Order</li>
                    <li className="mb-2">Track Order</li>
                    <li className="mb-2">Contact Us</li>
                    <li className="">FAQs</li>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold mb-2 lg:mb-7">Privacy & Legal</h3>
                <ul className="text-gray-200 text-sm">
                    <li className="mb-2">Privacy Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
                <h3 className="font-semibold mb-2 sm:mb-7">Stay Updated</h3>
                <p className="text-md font-normal">Subscribe to our newsletter to get the latest updates about us</p>
                <form 
                 // onSubmit={handleSubmit} 
                  className="mt-5 flex">
                    <input 
                        type="email"
                       // value={email}
                       // onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-1.5 w-auto lg:px-2 rounded-l-lg text-[#181818] focus:outline-none"
                        placeholder="Enter your email"
                        required
                    />
                    <button
                        type="submit"
                        className={`bg-[#2ECF5A] py-3 px-1.5 lg:px-2 rounded-r-lg font-semibold text-[#fff]`}
                      //  disabled={isSubmitting}
                      // ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        Subscribe
                        {/* {isSubmitting ? 'Subscribing...' : 'Subscribe'} */}
                    </button>
                </form>
                {/* {message && <p className="mt-3 text-red-600 font-bold">{message}</p>} */}
            </div>
        </footer>
    );
}

export default Footer;
