import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successNotification, setSuccessNotification] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const oobCode = searchParams.get("oobCode");

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@_+/.,:*&%$#!~`\\|])[A-Za-z\d@_+/.,:*&%$#!~`\\|-]{8,}$/;

  const schema = Yup.object({
    newPassword: Yup.string()
      .matches(
        passwordRegex,
        "Password must be at least 8 characters long, contain a number, a capital letter, and a special character."
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const validatePasswords = async () => {
    try {
      await schema.validate({ newPassword, confirmPassword });
      setError("");
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setError(error.errors[0] || "Validation error occurred.");
      } else {
        setError("An unexpected error occurred during validation.");
      }
      return false;
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validatePasswords()) {
      if (!oobCode) {
        setError("Invalid or missing reset code.");
        return;
      }

      const auth = getAuth();
      confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
          setError("");
          setSuccessNotification(true);
          setTimeout(() => {
            setSuccessNotification(false);
            navigate("/login");
          }, 8000);
        })
        .catch((error) => {
          console.error("Error resetting password:", error);
          setError("Failed to reset the password. Please try again.");
        });
    }
  };

  return (
    <div className="bg-[#ffeee8] h-[100vh] flex flex-col items-center justify-center py-5">
      <Link to="/">
        <img src="/YungDoyensLogoText.png" alt="Logo" className="mb-6" />
      </Link>

      <div>
        <p className="syne-700 text-3xl my-6 text-[#2b2b2b]">
          <span className="text-[#fe5a1d]">Reset</span> Password
        </p>
      </div>

      <div className="bg-white w-4/5 lg:w-[30%] rounded-xl py-3 shadow-md px-5">
        <p className="inter-600 text-xl w-auto text-center text-[#2b2b2b] my-4">
          Reset Password
        </p>
        <hr className="bg-[#fe5a1d] w-full" />

        <form onSubmit={handleResetPassword} className="flex flex-col justify-center">
          <label className="text-base font-normal text-[#2b2b2b] block mt-3 mb-3">
            Password <br />
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 border-2 border-[#fe5a1d] rounded-full py-4 px-5 focus:outline-none placeholder:text-sm placeholder:text-[#757575] placeholder:font-normal"
                placeholder="******"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-5 text-[#2b2b2b]"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </label>

          <label className="text-base font-normal text-[#2b2b2b] block mb-3">
            Confirm Password <br />
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 border-2 border-[#fe5a1d] rounded-full py-4 px-5 focus:outline-none placeholder:text-sm placeholder:text-[#757575] placeholder:font-normal"
                placeholder="******"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-5 text-[#2b2b2b]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </label>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            className="mx-auto w-3/4 border border-[#fe5a1d] text-center text-white bg-[#fe5a1d] font-semibold rounded-full py-3 mt-4"
            type="submit"
          >
            Reset Password
          </button>
        </form>

        {successNotification && (
          <div className="text-center text-green-600 mt-3">
            <IoIosCheckmarkCircleOutline size={24} />
            Password reset successful! You will be redirected to the login page.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
