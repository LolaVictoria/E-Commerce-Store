import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, firstName, lastName } = location.state;

  const initialValues = {
    accountType: '',
    gender: '',
    location: '',
    businessName: '',
  };

  const validationSchema = Yup.object({
    accountType: Yup.string().required('Account type is required'),
    gender: Yup.string().required('Gender is required'),
    location: Yup.string().required('Location is required'),
    businessName: Yup.string().required('Business name is required'),
  });

  const getUserCountry = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    const UserCountryDetails = {
      countryCode: String(res.data["country_code"]),
      continentCode: String(res.data["continent_code"]),
      countryName: String(res.data["country_name"]),
      response: res,
    };
    return UserCountryDetails;
  };

  const onSubmit = async (
    values: { accountType: string; gender: string; location: string; businessName: string },
    { setSubmitting, setFieldError }: any
  ) => {
    const { accountType, gender, location, businessName } = values;
  
    try {
      // Fetch the user's country details
      const userCountryDetails = await getUserCountry();
  
      // Check if the business name already exists in Firestore
      const q = query(
        collection(db, "users"),
        where("businessName.toLowerCase()", "==", businessName.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        setFieldError("businessName", "Business name already exists");
        setSubmitting(false);
        return;
      }
  
      // If business name is unique, proceed to save the profile
      const userDoc = {
        firstName,
        lastName,
        email,
        accountType,
        gender,
        location,
        businessName,
        createdAt: new Date(),
        cartItems: [], // Initialize an empty cart
        countryCode: userCountryDetails.countryCode, // Save the country code
        continentCode: userCountryDetails.continentCode, // Save the continent code
        countryName: userCountryDetails.countryName, // Save the country name
      };
  
      await setDoc(doc(db, "users", email), userDoc);
  
      navigate("/login");
    } catch (error) {
      console.error("Error saving profile:", error);
      setSubmitting(false);
    }
  };
  




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#2ECF5A' }}>Complete Your Profile</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <span className="text-gray-700">Account Type</span>
                <Field as="select" name="accountType" className="mt-1 px-3 py-2 border rounded-lg">
                  <option value="">Select Account Type</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </Field>
                <ErrorMessage name="accountType" component="div" className="text-red-600 font-bold" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Gender</span>
                <Field as="select" name="gender" className="mt-1 px-3 py-2 border rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-600 font-bold" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Location</span>
                <Field type="text" name="location" placeholder="Enter your location in Nigeria" className="mt-1 px-3 py-2 border rounded-lg" />
                <ErrorMessage name="location" component="div" className="text-red-600 font-bold" />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700">Business Name</span>
                <Field type="text" name="businessName" placeholder="Enter your business name" className="mt-1 px-3 py-2 border rounded-lg" />
                <ErrorMessage name="businessName" component="div" className="text-red-600 font-bold" />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-[#2ECF5A]'}`}
              >
                {isSubmitting ? "Saving..." : "Complete Profile"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompleteProfile;
