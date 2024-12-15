import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { CountryInput, StateInput } from "country-state-input-field";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, firstName, lastName } = location.state;

  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

  const initialValues = {
    accountType: '',
    gender: '',
    country: '',
    state: '',
    businessName: '',
  };

  const validationSchema = Yup.object({
    accountType: Yup.string().required('Account type is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    businessName: Yup.string().required('Business name is required'),
  });

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await axios.get("https://ipapi.co/json/");
        setSelectedCountryId(res.data.country_code);
      } catch (error) {
        console.error("Error fetching user's country:", error);
      }
    };
    fetchUserCountry();
  }, []);

  const onSubmit = async (
    values: { accountType: string; gender: string; country: string; state: string; businessName: string },
    { setSubmitting, setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    const { accountType, gender, country, state,  businessName } = values;

    try {
      const lowerCaseBusinessName = businessName.toLowerCase();
      const businessNameQuery = query(
        collection(db, "user"),
        where("businessName", "==", lowerCaseBusinessName)
      );
      const querySnapshot = await getDocs(businessNameQuery);

      if (!querySnapshot.empty) {
        setFieldError("businessName", "Business name already exists");
        setSubmitting(false);
        return;
      }

      const userDoc = {
        firstName,
        lastName,
        email,
        accountType,
        gender,
        location: `${country}, ${state}`,
        businessName: lowerCaseBusinessName,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", email), userDoc);

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        toast.success("Profile saved successfully. Please verify your email.");
      } else {
        toast.error("User is not signed in. Please sign in and try again.");
      }

      navigate("/login");
    } catch (error) {
      console.error("Error saving profile:", error);
      setSubmitting(false);
      toast.error("Error saving profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#2ECF5A]">Complete Your Profile</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col space-y-4 bg-[#2ECF5A]">
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
                <span className="text-gray-700">Country and State</span>
                <CountryInput
                  onSelect={(country) => {
                    setSelectedCountryId(country.id);
                    setFieldValue("country", country.name);
                  }}
                   className="w-full focus:outline-none"
    inputClassName="text-gray-900 w-full bg-white rounded-md pl-1 pb-1 pt-1 focus:outline-none"
    />
                <ErrorMessage name="country" component="div" className="text-red-600 font-bold" />
                
                <StateInput
                  selectedCountryId={selectedCountryId}
                  onSelect={(state) => setFieldValue("state", state.name)}
                  className="w-full mt-2"
    inputClassName="text-gray-900 w-full bg-white rounded-md pl-1 pb-1 pt-1 focus:outline-none"
    
                />
                
                <ErrorMessage name="state" component="div" className="text-red-600 font-bold" />
              </label>


            

              <label className="flex flex-col">
                <span className="text-gray-700">Business Name</span>
                <Field
                  type="text"
                  name="businessName"
                  placeholder="Enter your business name"
                  className="mt-1 px-3 py-2 border rounded-lg focus:outline-none"
                />
                <ErrorMessage name="businessName" component="div" className="text-red-600 font-bold" />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-[#FFFF]'}`}
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
