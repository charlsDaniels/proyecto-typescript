import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { auth } from "../../services/firebase/initialize";

interface RegisterProps {
  onChangeMode: () => void;
}

const Register: React.FC<RegisterProps> = ({ onChangeMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const { closeAuthModal } = useAuthContext();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Las contraseñas no coinciden");
      }
    }
    return isValid;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    setError("");
    try {
      if (validatePassword()) {
        await createUserWithEmailAndPassword(auth, email, password);
        closeAuthModal();
      }
    } catch (error) {
      setError("Ocurrió un error");
    }
  };

  return (
    <>
      <Typography variant="h6" component="h2">
        Crear usuario
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <FormControl
        color="secondary"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          name="email"
          color="secondary"
          size="small"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Contraseña"
          name="password"
          color="secondary"
          size="small"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          label="Repetir contraseña"
          name="confirmPassword"
          color="secondary"
          size="small"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Aceptar
        </Button>
      </FormControl>

      <Typography>
        Si ya tenés un usuario,
        <Typography component={Button} color="secondary" onClick={onChangeMode}>
          iniciá sesión!
        </Typography>
      </Typography>
    </>
  );
};

export default Register;
