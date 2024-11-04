import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  currentEmail: string;
  setCurrentEmail: Dispatch<SetStateAction<string>>;
  currentFirstName: string;
  setCurrentFirstName: Dispatch<SetStateAction<string>>;
  currentLastName: string;
  setCurrentLastName: Dispatch<SetStateAction<string>>;
  accountType: string;
  setAccountType: Dispatch<SetStateAction<string>>;
  businessName: string;
  setBusinessName: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState<string>(sessionStorage.getItem("email") || "");
  const [currentFirstName, setCurrentFirstName] = useState<string>(sessionStorage.getItem("firstName") || "");
  const [currentLastName, setCurrentLastName] = useState<string>(sessionStorage.getItem("lastName") || "");
  const [accountType, setAccountType] = useState<string>(sessionStorage.getItem("accountType") || "");
  const [businessName, setBusinessName] = useState<string>(sessionStorage.getItem("businessName") || "");
  const [location, setLocation] = useState<string>(sessionStorage.getItem("userLocation") || "");

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const email = user.email || "";
        setCurrentEmail(email);
        sessionStorage.setItem("email", email);

      }
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("firstName", currentFirstName);
    sessionStorage.setItem("lastName", currentLastName);
    sessionStorage.setItem("accountType", accountType);
    sessionStorage.setItem("businessName", businessName);
    sessionStorage.setItem("userLocation", location);
  }, [currentFirstName, currentLastName, accountType, businessName, location]);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentEmail("");
      setCurrentFirstName("");
      setCurrentLastName("");
      setAccountType("");
      setBusinessName("");
      setLocation("");

      sessionStorage.clear();
      navigate("/");  
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentEmail,
        setCurrentEmail,
        currentFirstName,
        setCurrentFirstName,
        currentLastName,
        setCurrentLastName,
        accountType,
        setAccountType,
        businessName,
        setBusinessName,
        location,
        setLocation,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
