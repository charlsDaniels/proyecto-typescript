import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import AuthModal from "../components/Auth/AuthModal";
import { auth } from "../services/firebase/initialize";
import { AuthContextType } from "../types/Auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setUser] = useState<null | FirebaseUser>(null);

  const [openModal, setOpenModal] = useState(false);

  const userIsAuthenticated = () => {
    return authUser !== null;
  };

  const openAuthModal = () => setOpenModal(true);

  const closeAuthModal = () => setOpenModal(false);

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export default AuthProvider;
