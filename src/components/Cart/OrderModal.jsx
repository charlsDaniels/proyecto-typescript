import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const OrderModal = ({ orderId, onClose }) => {
  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Typography variant="h6" component="h2">
          Recibimos tu solicitud!
        </Typography>
        <Typography>El código de tu orden es: {orderId}</Typography>

        <Button variant="outlined" color="secondary" onClick={onClose}>
          Aceptar
        </Button>
      </Box>
    </Modal>
  );
};

export default OrderModal;
