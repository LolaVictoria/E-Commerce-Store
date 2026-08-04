import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  currentEmail: string;
  setCurrentEmail: Dispatch<SetStateAction<string>>;

  currentName: string;
  setCurrentName: Dispatch<SetStateAction<string>>;

  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentName, setCurrentName] = useState(
    localStorage.getItem("name") || ""
  );
  const [currentEmail, setCurrentEmail] = useState(
    localStorage.getItem("email") || ""
  );

  const [role, setRole] = useState(
    localStorage.getItem("role") || ""
  );
 

const isAuthenticated = !!localStorage.getItem("token");
  useEffect(() => {
    localStorage.setItem("email", currentEmail);
    localStorage.setItem("name", currentName);
    localStorage.setItem("role", role);
  }, [currentEmail, currentName, role]);

  const logout = () => {
      localStorage.removeItem("token");
      sessionStorage.clear();

      setCurrentEmail("");
      setCurrentName("");
      setRole("");
      

      navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        currentEmail,
        setCurrentEmail,
        currentName,
        setCurrentName,
        role,
        setRole,
        isAuthenticated,
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
