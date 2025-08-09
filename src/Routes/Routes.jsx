import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registraion/Registration";
import Drop_shoulder from "../pages/T-Shirt/Drop Shoulder/Drop_shoulder";
import V_neck from "../pages/T-Shirt/V Neck/V_neck";
import Turtle_neck from "../pages/T-Shirt/Turtle Neck/Turtle_neck";
import Polo from "../pages/T-Shirt/Polo/Polo";
import Pocket from "../pages/T-Shirt/Pocket/Pocket";
import Club_Jursey from "../pages/Jursey/Club Jursey/Club_Jursey";
import Basic_Jursey from "../pages/Jursey/Basic Jursey/Basic_Jursey";
import About_us from "../pages/About Us/About_us";
import Error_page from "../pages/Error Page/Error_page";
import Dash_main from "../Dash Main/Dash_main";
import Admin_error_page from "../pages/Admin ErrorPage/Admin_error_page";
import Admin_Drop_shoulder from "../pages/Admin/Product_view/T-shirt/Drop Shoulder/Drop_shoulder";
import Admin_V_neck from "../pages/Admin/Product_view/T-shirt/V Neck/V_neck";
import Admin_Turtle_neck from "../pages/Admin/Product_view/T-shirt/Turtle Neck/Turtle_neck";
import Admin_Polo from "../pages/Admin/Product_view/T-shirt/Polo/Polo";
import Admin_Pocket from "../pages/Admin/Product_view/T-shirt/Pocket/Pocket";
import Admin_Club_Jursey from "../pages/Admin/Product_view/Jursey/Club Jursey/Club_Jursey";
import Admin_Basic_Jursey from "../pages/Admin/Product_view/Jursey/Basic Jursey/Basic_Jursey";
import Add_product from "../pages/Admin/Add product/Add_product";
import Add_offer from "../pages/Admin/Add Offer/Add_offer";
import Offer_list from "../pages/Admin/Offer List/Offer_list";
import Edit_product from "../pages/Admin/Edit Product/Edit_product";
import Edit_offer from "../pages/Admin/Edit Offer/Edit_offer";
import T_shirt from "../pages/Admin/Product_view/T-shirt/T-shirt";
import Jursey from "../pages/Admin/Product_view/Jursey/Jursey";
import Dashboard from "../pages/Admin/Dash Board/Dashboard";
import Product_details from "../pages/Poduct_details/Product_details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error_page />,
    children: [
      { path: "/", element: <Home /> },
      { path: "Login", element: <Login /> },
      { path: "Registration", element: <Registration /> },
      { path: "T-Shirt/Drop Shoulder", element: <Drop_shoulder /> },
      { path: "T-Shirt/V Neck", element: <V_neck /> },
      { path: "T-Shirt/Turtle Neck", element: <Turtle_neck /> },
      { path: "T-Shirt/Polo", element: <Polo /> },
      { path: "T-Shirt/Pocket", element: <Pocket /> },
      { path: "Jursey/Club", element: <Club_Jursey /> },
      { path: "Jursey/Basic Jursey", element: <Basic_Jursey /> },
      { path: "About Us", element: <About_us /> },
      { path: "Product_details/:id", element: <Product_details></Product_details> },
    ],
  },

  {
    path: "admin",
    element: <Dash_main />,
    errorElement: <Admin_error_page />,
    children: [
      { path: "admin", element: <Dashboard></Dashboard> },
      { path: "T-Shirt/Drop Shoulder", element: <Admin_Drop_shoulder /> },
      { path: "T-Shirt/V Neck", element: <Admin_V_neck /> },
      { path: "T-Shirt/Turtle Neck", element: <Admin_Turtle_neck /> },
      { path: "T-Shirt/Polo", element: <Admin_Polo /> },
      { path: "T-Shirt/Pocket", element: <Admin_Pocket /> },
      { path: "Jursey/Club", element: <Admin_Club_Jursey /> },
      { path: "Jursey/Basic Jursey", element: <Admin_Basic_Jursey /> },
      { path: "Add Product", element: <Add_product /> },
      { path: "Add Offer", element: <Add_offer /> },
      { path: "Offer List", element: <Offer_list /> },
      { path: "Edit Product", element: <Edit_product /> },
      { path: "Edit Offer", element: <Edit_offer /> },
      { path: "T-shirt", element: <T_shirt /> },
      { path: "Jursey", element: <Jursey /> },

    ],
  },
]);
