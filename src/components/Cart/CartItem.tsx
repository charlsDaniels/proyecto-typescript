import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../providers/CartProvider";
import { CartContextType, CartItemInterface, ItemSize } from "../../types/Cart";

interface Props {
  item: CartItemInterface;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const cartContext = useContext(CartContext) as CartContextType;

  const productTitle = (item: CartItemInterface) => {
    return `${item.categoryDescription.slice(0, -1)} ${item.title}`;
  };

  const quantityDetailText = (size: ItemSize) => {
    const text = size.quantity > 1 ? "unidades" : "unidad";
    return `Talle ${size.id}: ${size.quantity} ${text}`;
  };

  const totalAmountByItem = (item: CartItemInterface) => {
    const sumBySizes = item.sizes.reduce((acc, item) => acc + item.quantity, 0);
    return sumBySizes * item.price;
  };

  return (
    <Card
      elevation={5}
      key={item.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexWrap: "wrap-reverse",
        }}
      >
        <Box>
          <Link
            to={`/item/${item.id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Typography
              variant="h6"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {productTitle(item)}
            </Typography>
          </Link>
          <Typography variant="body2" ml={2}>
            ${item.price},00
          </Typography>

          <Typography variant="body1" mt={2} mb={0}>
            Cantidad
          </Typography>

          {item.sizes.map((size) => (
            <Typography
              key={size.id}
              variant="body2"
              ml={2}
              sx={{ width: 200 }}
            >
              {quantityDetailText(size)}
            </Typography>
          ))}
        </Box>
        <Box width={122}>
          <CardMedia
            component="img"
            sx={{ objectFit: "contain" }}
            image={item.pictureUrl}
            alt={item.title}
          />
        </Box>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mt: 1,
          mb: 2,
        }}
      >
        <Typography variant="body1">
          Total producto: ${totalAmountByItem(item)},00
        </Typography>

        <Button
          color="error"
          variant="outlined"
          size="small"
          onClick={() => cartContext.removeItem(item)}
        >
          Eliminar
        </Button>
      </Box>
    </Card>
  );
};

export default CartItem;
