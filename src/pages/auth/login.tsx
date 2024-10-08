import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useState, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
}

const Login = () => {
    const navigate = useNavigate();
    const { setCurrentFirstName, setCurrentLastName, setAccountType, setBusinessName, setCurrentEmail } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

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
            default:
                return 'An unknown error occurred. Please try again.';
        }
    };

    const doSignInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const doSignInWithGoogle = async (): Promise<UserCredential> => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result;
    };

    const initialValues: FormValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const fetchUserProfile = async (email: string): Promise<ProfileData> => {
        const userDocRef = doc(db, "users", email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data() as ProfileData;
        } else {
            throw new Error("User profile not found.");
        }
    };

    const onSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ): Promise<void> => {
        const { email, password } = values;
        setIsSigningIn(true);
        try {
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            const user = userCredential.user;
    
            const profileData = await fetchUserProfile(user.email as string);
    
            setCurrentFirstName(profileData.firstName);
            setCurrentLastName(profileData.lastName);
            setAccountType(profileData.accountType);
            setBusinessName(profileData.businessName || "");
            setCurrentEmail(user.email as string);
    
            if (["buyer", "seller"].includes(profileData.accountType)) {
                navigate("/");
            } else {
                navigate('/complete-profile');
            }
        } catch (error: any) {
            console.error("Error during sign-in:", error);
            console.error("Error code:", error.code);
            setErrorMessage(getErrorMessage(error.code));
            setSubmitting(false);
            setIsSigningIn(false);
        }
    };
    
    const onGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        setIsSigningIn(true);
        try {
            const result = await doSignInWithGoogle();
            const user = result.user;

            let profileData: ProfileData;
            try {
                profileData = await fetchUserProfile(user.email as string);
            } catch (error) {
                console.log("User profile not found, redirecting to profile completion.");
                setCurrentEmail(user.email as string);
                navigate('/signup');
                return;
            }

            setCurrentFirstName(profileData.firstName);
            setCurrentLastName(profileData.lastName);
            setAccountType(profileData.accountType);
            setBusinessName(profileData.businessName || "");
            setCurrentEmail(user.email as string);

            if (["buyer", "seller"].includes(profileData.accountType)) {
                navigate("/");
            } else {
                navigate('/complete-profile');
            }
        } catch (err: any) {
            setErrorMessage(getErrorMessage(err.code));
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
                            <button
                                type="button"
                                disabled={isSubmitting || isSigningIn}
                                onClick={onGoogleSignIn}
                                className={`w-full px-4 py-2 mt-2 text-white font-medium rounded-lg ${isSubmitting || isSigningIn ? 'bg-gray-400' : 'bg-[#2ECF5A]'}`}
                            >
                                Sign In With Google
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="mt-4 text-center">
                    <span className="text-gray-700">Don't have an account yet? </span>
                    <Link to="/signup" className="text-[#2ECF5A] font-bold">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
