import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase"; 
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa6";
import Logo from "/assets/img/alaba-market-logo.png";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  };

  
  const handleManualSignUp = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    const { firstName, lastName, email, password } = values;
    setIsProcessing(true);
    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Navigate to CompleteProfile page
      navigate("/complete-profile", {
        state: { email: user.email, firstName, lastName },
      });
    } catch (error: any) { 
      console.error("Sign Up error:", error);
      setErrorMessage(getErrorMessage(error.code));
      setSubmitting(false);
      setIsProcessing(false);
    }
  };

  
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      
      let firstName = "";
      let lastName = "";
      if (user.displayName) {
        const [first, ...last] = user.displayName.split(" ");
        firstName = first;
        lastName = last.join(" ");
      }

      
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      
      navigate("/complete-profile", {
        state: { email: user.email, firstName, lastName },
      });
    } catch (error: any) { 
      console.error("Google Sign-In error:", error);
      setErrorMessage(getErrorMessage(error.code));
      setIsProcessing(false);
    }
  };

 
  const initialValues: SignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match") 
      .required("Confirm password is required"),
  });

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
        <h1
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#2ECF5A" }}
        >
          Create Account
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleManualSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              {errorMessage && (
                <div className="text-red-600 font-bold text-center">
                  {errorMessage}
                </div>
              )}
              <label className="flex flex-col">
                <span className="text-gray-700">First Name</span>
                <Field
                  type="text"
                  name="firstName"
                  className="mt-1 px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600 font-bold"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Last Name</span>
                <Field
                  type="text"
                  name="lastName"
                  className="mt-1 px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 font-bold"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Email</span>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 font-bold"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Password</span>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 font-bold"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Confirm Password</span>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="mt-1 px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 font-bold"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting || isProcessing}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${
                  isSubmitting || isProcessing ? "bg-gray-400" : "bg-[#2ECF5A]"
                }`}
              >
                {isSubmitting || isProcessing ? "Registering..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex items-center my-4">
          <hr className="w-full"/>
               <p className="text-[#2ecf5a] text-base mx-1.5">or</p>
               <hr className="w-full"/> 
          </div>

        <div className="flex flex-col">
          
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg text-white flex items-center justify-center ${
              isProcessing ? "bg-gray-400" : "bg-[#2ECF5A]"
            }`}
          >
             <FaGoogle size={15}/>
             <span className="ml-2">

            {isProcessing ? "Processing..." : "Sign Up With Google"}
             </span>
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-[#2ECF5A] font-bold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
