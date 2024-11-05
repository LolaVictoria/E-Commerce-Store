import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useState, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import Logo from "/assets/img/alaba-market-logo.png";

interface FormValues {
  email: string;
  password: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  accountType: string;
  businessName?: string;
  location: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentFirstName, setCurrentLastName, setAccountType, setBusinessName, setCurrentEmail, setLocation } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  const doSignInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const doSignInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const initialValues: FormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const fetchUserProfile = async (email: string): Promise<ProfileData | null> => {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? (userDoc.data() as ProfileData) : null;
  };

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      const userCredential = await doSignInWithEmailAndPassword(values.email, values.password);
      const user = userCredential.user;

      const profileData = await fetchUserProfile(user.email as string);
      if (profileData) {
        setCurrentFirstName(profileData.firstName);
        setCurrentLastName(profileData.lastName);
        setAccountType(profileData.accountType);
        setBusinessName(profileData.businessName || "");
        setLocation(profileData.location);
        setCurrentEmail(user.email as string);

        navigate("/");
      } else {
        setErrorMessage("Account not found. Please sign up.");
      }
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.code));
    } finally {
      setSubmitting(false);
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      const result = await doSignInWithGoogle();
      const user = result.user;

      const profileData = await fetchUserProfile(user.email as string);
      if (profileData) {
        setCurrentFirstName(profileData.firstName);
        setCurrentLastName(profileData.lastName);
        setAccountType(profileData.accountType);
        setBusinessName(profileData.businessName || "");
        setLocation(profileData.location);
        setCurrentEmail(user.email as string);

        navigate("/");
      } else {
        setErrorMessage("Account not found. Please sign up.");
      }
    } catch (err: any) {
      setErrorMessage(getErrorMessage(err.code));
    } finally {
      setIsSigningIn(false);
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
              <label className="flex flex-col">
                <span className="text-gray-700">Email</span>
                <Field type="email" name="email" autoComplete="email" className="mt-1 px-3 py-2 border rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-600 font-bold" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Password</span>
                <div className="relative">
                  <Field type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" className="mt-1 px-3 py-2 border rounded-lg w-full" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 px-3 flex items-center">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-600 font-bold" />
              </label>
              <button type="submit" disabled={isSubmitting || isSigningIn} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                {isSigningIn ? "Signing in..." : "Login"}
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
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-700">Don’t have an account? </span>
        <Link to="/signup" className="text-[#2ECF5A] font-bold">Sign up</Link>
      </div>
    </div>
    </div>
  );
};

export default Login;