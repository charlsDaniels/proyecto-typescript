import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import Box from "@mui/material/Box";
import { CartContextType } from "../../types/Cart";

const CartItemList = () => {
  const cartContext = useContext(CartContext) as CartContextType;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {cartContext.cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default CartItemList;
