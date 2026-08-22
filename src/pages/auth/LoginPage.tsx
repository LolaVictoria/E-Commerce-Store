
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import Logo from "/assets/img/alaba-market-logo.png";
import { login } from "../../services/authApi";
import { LoginRequest } from "../../types/auth";


const Login = () => {
  const navigate = useNavigate();
  const {
    setCurrentEmail,
    setCurrentName,
    setRole,
} = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const location = useLocation();

  const successMessage = location.state?.message;
  const initialValues: LoginRequest = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });


  const onSubmit = async (
      values: LoginRequest,
      { setSubmitting }: FormikHelpers<LoginRequest>
  ) => {
      try {
          const response = await login(values);

          localStorage.setItem("token", response.token);

          setCurrentEmail(response.email);
          setCurrentName(`${response.firstName} ${response.lastName}`);
          setRole(response.role);

          navigate("/");
      } catch (error: any) {
          setErrorMessage(
              error?.response?.data?.message ??
              "Invalid email or password."
          );
      } finally {
          setSubmitting(false);
      }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center bg-gray-100">
      <Link to="/">
        <div className="bg-black p-3 mb-5 rounded-md flex items-center justify-center text-xl font-bold lg:col-span-1">
                    <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                    <div>
                        <span className="text-[#2ECF5A]">Alaba </span>
                        <span className="text-[#fff]">Market</span>
                    </div>
                </div>
                </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "#2ECF5A" }}>Login</h1>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}


        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
              <label className="flex flex-col">
                <span className="text-gray-700">
                  Email: (for visitors/testers, use 
                  <span className="text-green-900 font-bold"> alabamarketecommerce@gmail.com </span>)</span>
                <Field type="email" name="email" autoComplete="email" className="mt-1 px-3 py-2 border rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-600 font-bold" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">
                  Password: (for visitors/testers, use 
                  <span className="text-green-900 font-bold "> alabamarket </span>)</span>
                <div className="relative">
                  <Field type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" className="mt-1 px-3 py-2 border rounded-lg w-full" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 px-3 flex items-center">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-600 font-bold" />
              </label>
              <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>


        {/* <div className="flex items-center my-4">
          <hr className="w-full"/>
               <p className="text-[#2ecf5a] text-base mx-1.5">or</p>
            <hr className="w-full"/> 
        </div> */}

        {/* <div className="flex flex-col">
          <button 
            onClick={onGoogleSignIn} 
            disabled={isSigningIn} 
            className={`px-4 py-2 rounded-lg text-white flex items-center justify-center ${
              isSigningIn ? "bg-gray-400" : "bg-[#2ECF5A]"
            }`}>
              <FaGoogle size={15}/>
              <span className="ml-2">
                 {isSigningIn ? "Signing in..." : "Sign in with Google"}
              </span>
          </button>
        </div> */}

        <div className="text-center mt-4">
          <span className="text-gray-700">Don’t have an account? </span>
        <Link to="/signup" className="text-[#2ECF5A] font-bold">Sign up</Link>
      </div>
    </div>
    </div>
  );
};

export default Login;
