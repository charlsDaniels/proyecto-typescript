import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OrderModal from "./OrderModal";
import { useState, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { addOrder } from "../../services/firebase/querys";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import Loader from "../UI/Loader";
import { CartContextType } from "../../types/Cart";

const CheckoutForm = () => {
  const cartContext = useContext(CartContext) as CartContextType;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [openModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    cartContext.clear();
    return navigate("/");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const order = {
        buyer: user,
        items: cartContext.cart,
        total: cartContext.totalAmount(),
        status: "generada",
        createdAt: serverTimestamp(),
      };
      const { id } = await addOrder(order);
      setOrderId(id);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = () => {
    if (user.email) {
      return String(user.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    return true;
  };

  const validatePhone = () => {
    if (user.phone) {
      return String(user.phone).match(/^\d+$/);
    }
    return true;
  };

  const formIsComplete = () => {
    return Object.values(user).every((value) => value);
  };

  const formIsValid = () => {
    return formIsComplete() && validateEmail() && validatePhone();
  };

  return (
    <>
      {loading && <Loader />}

      {openModal && <OrderModal orderId={orderId} onClose={handleCloseModal} />}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5">
            Total carrito: ${cartContext.totalAmount()},00
          </Typography>

          <Typography variant="body1" mt={5}>
            Completa tus datos para finalizar la compra!
          </Typography>

          <FormControl
            color="secondary"
            onChange={handleInputChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            fullWidth
          >
            <TextField
              label="Nombre"
              name="name"
              color="secondary"
              size="small"
              value={user.name}
            />
            <TextField
              label="Teléfono"
              name="phone"
              color="secondary"
              size="small"
              value={user.phone}
              error={!validatePhone()}
              helperText={!validatePhone() && "Debes ingresar sólo números."}
            />
            <TextField
              label="Email"
              name="email"
              color="secondary"
              size="small"
              type="email"
              value={user.email}
              error={!validateEmail()}
              helperText={!validateEmail() && "Debes ingresar un email válido."}
            />

            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
              disabled={!formIsValid()}
            >
              Comprar
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
