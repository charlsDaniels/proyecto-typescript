import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { auth } from "../../services/firebase/initialize";

interface LoginProps {
  onChangeMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onChangeMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { closeAuthModal } = useAuth();

  const handleSubmit = async () => {
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      closeAuthModal();
    } catch (error) {
      setError("Ocurrió un error");
    }
  };

  return (
    <>
      <Typography variant="h6" component="h2">
        Iniciar sesión
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleSubmit}
          disabled={!(email && password)}
        >
          Aceptar
        </Button>
      </FormControl>

      <Typography>
        Si todavía no tenés un usuario,
        <Typography component={Button} color="secondary" onClick={onChangeMode}>
          registrate!
        </Typography>
      </Typography>
    </>
  );
};

export default Login;
