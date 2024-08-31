import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase"; // Ensure this points to your Firebase config
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

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

  // Function to map Firebase error codes to user-friendly messages
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

  // Handler for manual sign-up
  const handleManualSignUp = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    const { firstName, lastName, email, password } = values;
    setIsProcessing(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Navigate to CompleteProfile page
      navigate("/complete-profile", {
        state: { email: user.email, firstName, lastName },
      });
    } catch (error: any) { // Explicitly typing 'error' as 'any'
      console.error("Sign Up error:", error);
      setErrorMessage(getErrorMessage(error.code));
      setSubmitting(false);
      setIsProcessing(false);
    }
  };

  // Handler for Google Sign-In
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract first and last name from displayName if available
      let firstName = "";
      let lastName = "";
      if (user.displayName) {
        const [first, ...last] = user.displayName.split(" ");
        firstName = first;
        lastName = last.join(" ");
      }

      // Update profile with split names
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Navigate to CompleteProfile page
      navigate("/complete-profile", {
        state: { email: user.email, firstName, lastName },
      });
    } catch (error: any) { // Explicitly typing 'error' as 'any'
      console.error("Google Sign-In error:", error);
      setErrorMessage(getErrorMessage(error.code));
      setIsProcessing(false);
    }
  };

  // Initial form values for manual sign-up
  const initialValues: SignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validation schema for manual sign-up
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
      .oneOf([Yup.ref("password"), undefined], "Passwords must match") // Replaced null with undefined
      .required("Confirm password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
        <div className="mt-6 flex flex-col items-center">
          <span className="text-gray-700 mb-2">Or</span>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg text-white ${
              isProcessing ? "bg-gray-400" : "bg-[#2ECF5A]"
            }`}
          >
            {isProcessing ? "Processing..." : "Sign Up With Google"}
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
