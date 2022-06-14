import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/Auth/AuthModal";
import { auth } from "../services/firebase/initialize";
import { AuthContextType } from "../types/Auth";

const authContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setUser] = useState<null | FirebaseUser>(null);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const userIsAuthenticated = () => {
    return authUser !== null;
  };

  const openAuthModal = () => setOpenModal(true);

  const closeAuthModal = () => setOpenModal(false);

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        authUser,
        userIsAuthenticated,
        openAuthModal,
        closeAuthModal,
        logout,
      }}
    >
      {openModal && <AuthModal />}
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
