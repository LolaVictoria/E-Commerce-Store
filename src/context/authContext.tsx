import { createContext,  useState, ReactNode, useEffect, SetStateAction, Dispatch, useContext } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextType = {
    
    currentEmail: string;
    setCurrentEmail: Dispatch<SetStateAction<string>>;
    currentFirstName: string;
    setCurrentFirstName: Dispatch<SetStateAction<string>>;
    currentLastName: string;
    setCurrentLastName: Dispatch<SetStateAction<string>>;
    accountType: string;
    setAccountType: Dispatch<SetStateAction<string>>;
    businessName: string 
    setBusinessName: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentFirstName, setCurrentFirstName] = useState("");
    const [currentLastName, setCurrentLastName] = useState("");
    const [accountType, setAccountType] = useState("");
    const [businessName, setBusinessName] = useState("");
    useEffect(() => {
        const savedFirstName = sessionStorage.getItem("firstName");
        if (savedFirstName) setCurrentFirstName(savedFirstName);
    
        const savedLastName = sessionStorage.getItem("lastName");
        if (savedLastName) setCurrentLastName(savedLastName);
    
        const savedAccountType = sessionStorage.getItem("accountType");
        if (savedAccountType) setAccountType(savedAccountType);
    
        const savedBusinessName = sessionStorage.getItem("businessName");
        if (savedBusinessName) setBusinessName(savedBusinessName);
    }, []);
    
    useEffect(() => {
        sessionStorage.setItem("firstName", currentFirstName);
    }, [currentFirstName]);
    
    useEffect(() => {
        sessionStorage.setItem("lastName", currentLastName);
    }, [currentLastName]);
    
    useEffect(() => {
        sessionStorage.setItem("accountType", accountType);
    }, [accountType]);
    
    useEffect(() => {
        sessionStorage.setItem("businessName", businessName);
    }, [businessName]);
    
    
    return (
        <AuthContext.Provider value={{ 
          
          
            currentFirstName, setCurrentFirstName,
            currentLastName, setCurrentLastName,
            accountType, setAccountType,
            businessName, setBusinessName,
            currentEmail, setCurrentEmail
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
