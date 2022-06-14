import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import Login from "./Login";
import Register from "./Register";
import CustomModal from "../UI/CustomModal";

const AuthModal: React.FC = () => {
  enum Modes {
    LOGIN,
    REGISTER,
  }

  const [mode, setMode] = useState(Modes.LOGIN);

  const { closeAuthModal } = useAuth();

  const toggleMode = () => {
    setMode(mode === Modes.LOGIN ? Modes.REGISTER : Modes.LOGIN);
  };

  return (
    <CustomModal onClose={closeAuthModal}>
      {mode === Modes.LOGIN && <Login onChangeMode={toggleMode} />}
      {mode === Modes.REGISTER && <Register onChangeMode={toggleMode} />}
    </CustomModal>
  );
};

export default AuthModal;
