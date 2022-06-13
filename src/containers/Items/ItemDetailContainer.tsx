import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemDetail from "../../components/Items/ItemDetail";
import Loader from "../../components/UI/Loader";
import { fetchProductById } from "../../services/firebase/querys";
import { DBProduct } from "../../types/Product";

const ItemDetailContainer = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<DBProduct | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const doc = await fetchProductById(productId);
      const data = doc.data();
      if (data) {
        setProduct({
          ...data,
          id: doc.id,
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {loading && <Loader />}

      {product && <ItemDetail item={product} />}
    </Box>
  );
};

export default ItemDetailContainer;
