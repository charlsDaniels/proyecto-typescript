import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface LoginProps {
  onChangeMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onChangeMode }) => {
  return (
    <>
      <Typography variant="h6" component="h2">
        Iniciar sesión
      </Typography>

      <TextField
        label="Email"
        name="email"
        color="secondary"
        size="small"
        type="email"
      />
      <TextField
        label="Contraseña"
        name="password"
        color="secondary"
        size="small"
      />
      <Typography>
        Si todavía no tenés un usuario,
        <Typography component={Button} onClick={onChangeMode}>
          registrate!
        </Typography>
      </Typography>
    </>
  );
};

export default Login;
