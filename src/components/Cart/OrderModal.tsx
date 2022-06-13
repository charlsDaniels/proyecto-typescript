import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomModal from "../UI/CustomModal";

interface Props {
  orderId: string;
  onClose: () => void;
}

const OrderModal = ({ orderId, onClose }: Props) => {
  return (
    <CustomModal onClose={onClose}>
      <Typography variant="h6" component="h2">
        Recibimos tu solicitud!
      </Typography>
      <Typography>El código de tu orden es: {orderId}</Typography>

      <Button variant="outlined" color="secondary" onClick={onClose}>
        Aceptar
      </Button>
    </CustomModal>
  );
};

export default OrderModal;
