import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useState, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";

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
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = (): void => setShowPassword(!showPassword);

    const getErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
            case 'auth/invalid-email': 
                return 'Invalid email address format.';
            case 'auth/user-disabled': 
                return 'This user account has been disabled.';
            case 'auth/user-not-found': 
                return 'No user found with this email address.';
            case 'auth/wrong-password': 
                return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use': 
                return 'This email address is already in use.';
            case 'auth/weak-password': 
                return 'Password is too weak. Please choose a stronger password.';
            case 'auth/popup-closed-by-user': 
                return 'The sign-in popup was closed before completing the sign-in.';
            case 'auth/cancelled-popup-request': 
                return 'Only one popup request is allowed at a time. Please try again.';
            case 'auth/network-request-failed': 
                return 'Network error. Please check your internet connection and try again.';
            case 'INVALID_LOGIN_CREDENTIALS': 
                return 'Invalid login credentials. Please check your email and password.';
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

    const initialValues: FormValues = { email: '', password: '' };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const fetchUserProfile = async (email: string): Promise<ProfileData | null> => {
        const userDocRef = doc(db, "users", email);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() ? (userDoc.data() as ProfileData) : null;
    };

    const onSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ): Promise<void> => {
        const { email, password } = values;
        setIsSigningIn(true);
        setErrorMessage(""); 
        try {
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            const profileData = await fetchUserProfile(user.email as string);

            if (profileData) {
                setCurrentFirstName(profileData.firstName);
                setCurrentLastName(profileData.lastName);
                setAccountType(profileData.accountType);
                setBusinessName(profileData.businessName || "");
                setLocation(profileData.location);
                setCurrentEmail(user.email as string);
                
                if (["buyer", "seller"].includes(profileData.accountType)) {
                    navigate("/");
                }
            } else {
                setErrorMessage("You do not have an acount with Alaba Market. Click on Sign Up to create an account");
            }
        } catch (error: any) {
            setErrorMessage(getErrorMessage(error.code));
        } finally {
            setSubmitting(false);
            setIsSigningIn(false);
        }
    };

    const onGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
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
                setCurrentEmail(user.email as string);

                if (["buyer", "seller"].includes(profileData.accountType)) {
                    navigate("/");
                }
            } else {
                setErrorMessage("You do not have an acount with Alaba Market. Click on Sign Up to create an account");
            }
        } catch (err: any) {
            setErrorMessage(getErrorMessage(err.code));
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#2ECF5A' }}>Login</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col space-y-4">
                            {errorMessage && (
                                <span className="text-red-600 font-bold">{errorMessage}</span>
                            )}
                            <label className="flex flex-col">
                                <span className="text-gray-700">Email</span>
                                <Field
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    className="mt-1 px-3 py-2 border rounded-lg"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 font-bold" />
                            </label>
                            <label className="flex flex-col">
                                <span className="text-gray-700">Password</span>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        autoComplete="current-password"
                                        className="mt-1 px-3 py-2 border rounded-lg w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-600 font-bold" />
                            </label>
                            <button
                                type="submit"
                                disabled={isSubmitting || isSigningIn}
                                className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSubmitting || isSigningIn ? 'bg-gray-400' : 'bg-[#2ECF5A]'}`}
                            >
                                {isSubmitting || isSigningIn ? "Signing In..." : 'Sign In'}
                            </button>
                            <div className="flex items-center">
                                <hr className="w-full"/>
                                <p className="text-[#2ecf5a] text-base mx-1.5">or</p>
                                <hr className="w-full"/> 
                            </div>
                            <button
                                type="button"
                                onClick={onGoogleSignIn}
                                disabled={isSubmitting || isSigningIn}
                                className={`w-full px-4 py-2 mt-2 text-white font-medium rounded-lg flex items-center justify-center ${isSigningIn ? 'bg-gray-400' : 'bg-[#2ECF5A]'}`}
                            >
                                <FaGoogle size={15}/>
                                <span className="ml-2">Sign In With Google</span>
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#2ECF5A] font-bold">Sign up</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
