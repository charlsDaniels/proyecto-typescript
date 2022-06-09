import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { BDProduct } from "../../types/Product";

interface Props {
  item: BDProduct;
}

const Item = ({ item }: Props) => {
  return (
    <Box sx={{ width: 260 }}>
      <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}>
        <Card
          elevation={5}
          sx={{
            borderRadius: 3,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent>
            <CardHeader
              title={item.title}
              subheader={`$${item.price},00 `}
              sx={{ pt: 0 }}
            />
            <CardMedia
              component="img"
              sx={{ objectFit: "contain" }}
              height="235"
              image={item.pictureUrl}
              alt={item.title}
            />
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default Item;
