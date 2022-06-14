import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/Navigation/Navbar/NavBar";
import NotFound from "./components/Navigation/NotFound";
import ItemDetailContainer from "./containers/Items/ItemDetailContainer";
import ItemListContainer from "./containers/Items/ItemListContainer";
import AuthProvider from "./providers/AuthProvider";
import CartProvider from "./providers/CartProvider";

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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
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

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />

                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Container>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
