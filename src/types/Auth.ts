export interface User {
  tokenId: string
}

export type AuthContextType = {
  user: User | null,
  openAuthModal: () => void
  closeAuthModal: () => void
  userIsAuthenticated: () => boolean;
};