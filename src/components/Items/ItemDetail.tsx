import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { CartContext } from "../../providers/CartProvider";
import { CartContextType, CartItemInterface } from "../../types/Cart";
import { DBProduct, Size } from "../../types/Product";
import ItemCount from "./ItemCount";

interface Props {
  item: DBProduct;
}

const ItemDetail = ({ item }: Props) => {
  const cartContext = useContext(CartContext) as CartContextType;
  const { userIsAuthenticated, openAuthModal } = useAuthContext();

  const [stock, setStock] = useState(0);
  const [initialCount, setInitialCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [showCheckoutBtn, setShowCheckoutBtn] = useState(false);

  const onAddHandler = (quantity: number) => {
    if (!userIsAuthenticated()) {
      openAuthModal();
    } else {
      const selectedQuantity =
        initialCount === 1 ? quantity - 1 : quantity - initialCount;

      cartContext.addItem(
        {
          id: item.id,
          categoryDescription: item.categoryDescription,
          title: item.title,
          price: item.price,
          pictureUrl: item.pictureUrl,
          sizes: [],
        } as CartItemInterface,
        selectedSize,
        selectedQuantity
      );
      setShowCheckoutBtn(true);
    }
  };

  const selectSizeHandler = (size: Size) => {
    const initialCount = cartContext.getItemInitialCount(item.id, size.id);
    setInitialCount(initialCount);
    setSelectedSize(size.id);
    setStock(size.stock);
  };

  const productTitle = () => {
    return `${item.categoryDescription.slice(0, -1)} ${item.title}`;
  };

  return (
    <Box sx={{ display: "flex", mt: 6, ml: 7, gap: 5, flexWrap: "wrap" }}>
      <Box>
        <Box
          component="img"
          sx={{
            width: 265,
          }}
          alt={item.description}
          src={item.pictureUrl}
        />
      </Box>

      <Box height={400}>
        <Typography variant="h5" textTransform="capitalize">
          {productTitle()}
        </Typography>
        <Typography variant="body1" ml={2}>
          ${item.price},00
        </Typography>
        <Typography variant="body2" mt={2}>
          Hasta 6 cuotas sin inter??s
        </Typography>

        {!showCheckoutBtn && (
          <Box mt={3} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="overline">Selecciona tu talla</Typography>

            <ButtonGroup size="small" color="secondary" variant="outlined">
              {item.sizes.map((size) => (
                <Button
                  key={size.id}
                  onClick={() => selectSizeHandler(size)}
                  style={
                    selectedSize === size.id
                      ? {
                          color: "#fff",
                          backgroundColor: "#3B253B",
                        }
                      : undefined
                  }
                >
                  {size.id}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}

        <Typography variant="body2" my={3}>
          {item.description}
        </Typography>

        {showCheckoutBtn && (
          <Button
            component={NavLink}
            to={`/cart`}
            color="secondary"
            variant="contained"
            size="small"
          >
            Finalizar compra
          </Button>
        )}

        {stock !== 0 && !showCheckoutBtn && (
          <>
            <Typography variant="body2" my={1}>
              Stock disponible: {stock}
            </Typography>
            <ItemCount
              stock={stock}
              initial={initialCount}
              onAdd={onAddHandler}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ItemDetail;
