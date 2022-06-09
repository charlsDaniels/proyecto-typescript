import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

interface Props {
  stock: number;
  initial: number;
  onAdd: (quantity: number) => void;
}

const ItemCount = ({ stock, initial, onAdd }: Props) => {
  const [quantity, setQuantity] = useState(initial);

  useEffect(() => {
    setQuantity(initial);
  }, [stock, initial]);

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <ButtonGroup size="small" color="secondary">
        <Button
          disabled={quantity === 0}
          onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
        >
          -
        </Button>
        <Button>{quantity}</Button>
        <Button
          disabled={quantity === stock}
          onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
        >
          +
        </Button>
      </ButtonGroup>

      <Button
        size="small"
        color="secondary"
        disabled={quantity === 0}
        variant="contained"
        onClick={() => onAdd(quantity)}
      >
        Agregar
      </Button>
    </Box>
  );
};

export default ItemCount;
