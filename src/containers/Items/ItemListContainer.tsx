import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../../components/Items/ItemList";
import Loader from "../../components/UI/Loader";
import { fetchProducts } from "../../services/firebase/querys";
import { DBProduct } from "../../types/Product";

const ItemListContainer = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const snapshot = await fetchProducts(categoryId);
      const products = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <Box>
      {loading && <Loader />}

      {products && (
        <Box>
          <Typography
            variant="h5"
            mb={5}
            textAlign="center"
            textTransform="capitalize"
          >
            {categoryId}
          </Typography>
          <ItemList items={products} />
        </Box>
      )}
    </Box>
  );
};

export default ItemListContainer;
