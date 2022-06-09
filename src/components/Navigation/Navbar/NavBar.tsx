// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
// import Brand from "../../Brand/Logo";
// import AsideMenu from "./Aside/AsideMenu";
// import NavigationItems from "./NavigationItems/NavigationItems";
// import { useState } from "react";

// interface Page {
//   name: string,
//   link: string
// }

// //una forma de declarar interfaces para el estado es la siguiente, va con la forma 3
// // interface NavbarState {
// //   pages: Array<Page>
// // }

// const pages = ["camisas", "remeras"];

// const NavBar = () => {

//   //1er forma
//   const [pages, setPages] = useState<Array<string>>([]);

//   //2 forma
//   // const [pages, setPages] = useState<Page[]>([]);

//   //3er forma
//   // const [pages, setPages] = useState<NavbarState["pages"]>([]);

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar>
//           <AsideMenu pages={pages} />

//           <Brand />

//           <NavigationItems pages={pages} />
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default NavBar;

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Brand from "../../Brand/Logo";
import AsideMenu from "./Aside/AsideMenu";
import NavigationItems from "./NavigationItems/NavigationItems";
import { useEffect, useState } from "react";
import { Category } from "../../../types/Category";
import { fetchCategories } from "../../../services/firebase/querys";

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = async () => {
    const snapshot = await fetchCategories();
    const categories = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setCategories(categories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <AsideMenu categories={categories} />

          <Brand />

          <NavigationItems categories={categories} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
