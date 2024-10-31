import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [steps, setSteps] = useState(1);

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSteps(2); // Move to step 2 after success
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
      });
  };

  return (
    <div className="bg-[#ffff] h-[100vh] flex flex-col items-center justify-center py-5">
      <Link to="/">
        <img src="/alaba-market-logo.png" alt="Logo" className="mb-6" />
      </Link>

      <div>
        <p className="syne-700 text-3xl my-6 text-[#2b2b2b]">
          <span className="text-[#2ECF5A]">Forgot</span> Password?
        </p>
      </div>

      <div className={`bg-white rounded-xl py-3 shadow-md ${steps === 1 ? "w-4/5 lg:w-[30%]" : "w-4/5 lg:w-[30%]"}`}>
        <p className="inter-600 text-xl w-auto text-center text-[#2b2b2b] my-4">Forgot Password</p>
        <hr className="bg-gray-100 w-full" />

        {steps === 1 && (
          <form onSubmit={handlePasswordReset} className="px-5 flex flex-col justify-center">
            <label className="text-base font-normal text-[#3f3f3f] mb-3 block mt-4">
              Email <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border-2 border-gray-200 rounded-full py-4 px-5 focus:outline-none placeholder:text-sm placeholder:text-[#757575] placeholder:font-normal"
                placeholder="Enter your email address"
                required
              />
            </label>

            <button
              className="mx-auto w-3/4 border border-[#2ECF5A] text-center text-white bg-[#2ECF5A] font-semibold rounded-full py-3 mt-4"
              type="submit"
            >
              Continue
            </button>
          </form>
        )}

        {steps === 2 && (
          <div className="mx-3 py-3">
            <p className="font-normal text-base text-gray-900 text-center">
              A link has been sent to your email. Use the link to reset your password.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
