import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface RegisterProps {
  onChangeMode: () => void;
}

const Register: React.FC<RegisterProps> = ({ onChangeMode }) => {
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
      <TextField
        label="Repetir contraseña"
        name="password"
        color="secondary"
        size="small"
      />

      <Typography>
        Si ya tenés un usuario,
        <Typography component={Button} onClick={onChangeMode}>
          iniciá sesión!
        </Typography>
      </Typography>
    </>
  );
};

export default Register;
