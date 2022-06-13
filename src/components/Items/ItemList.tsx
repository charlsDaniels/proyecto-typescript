//@ts-check
import Box from "@mui/material/Box";
import { DBProduct } from "../../types/Product";
import Item from "./Item";

interface Props {
  items: DBProduct[];
}

const ItemList = ({ items }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 5,
        flexWrap: "wrap",
      }}
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default ItemList;
