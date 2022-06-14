import { User as FirebaseUser } from "firebase/auth";

export type AuthContextType = {
  authUser: null | FirebaseUser
  openAuthModal: () => void
  closeAuthModal: () => void
  userIsAuthenticated: () => boolean
  logout: () => void
};