import { createContext, useContext, useState } from "react";
import AuthModal from "../components/Auth/AuthModal";
import { AuthContextType, User } from "../types/Auth";

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
  const [user, setUser] = useState<null | User>(null);

  const [openModal, setOpenModal] = useState(false);

  const userIsAuthenticated = () => {
    return !!user;
  };

  // const login = () => {
  //   signInWithEmailAndPasword()
  // };

  const openAuthModal = () => setOpenModal(true);

  const closeAuthModal = () => setOpenModal(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        userIsAuthenticated,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {openModal && <AuthModal />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
