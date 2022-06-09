import NavBar from "./components/Navigation/Navbar/NavBar";
import Container from "@mui/material/Container";
import ItemListContainer from "./containers/Items/ItemListContainer";
import ItemDetailContainer from "./containers/Items/ItemDetailContainer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./providers/CartProvider";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/Navigation/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c4e7ed",
    },
    secondary: {
      main: "#553555",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Container maxWidth="lg" sx={{ my: 6 }}>
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer />}
              />
              <Route
                path="/item/:productId"
                element={<ItemDetailContainer />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Container>
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
