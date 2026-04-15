import { createBrowserRouter } from "react-router-dom";
import { axiosSecure } from "../Hooks/UseAxiosSecure";

import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registraion/Registration";
import Polo from "../pages/T-Shirt/Polo/Polo";
import About_us from "../pages/About Us/About_us";
import Error_page from "../pages/Error Page/Error_page";
import Dash_main from "../Dash Main/Dash_main";
import Admin_error_page from "../pages/Admin ErrorPage/Admin_error_page";
import Add_product from "../pages/Admin/Add product/Add_product";
import Edit_product from "../pages/Admin/Edit Product/Edit_product";
import Edit_offer from "../pages/Admin/Edit Offer/Edit_offer";
import Dashboard from "../pages/Admin/Dash Board/Dashboard";
import Product_details from "../pages/Poduct_details/Product_details";
import CartInfo from "../pages/CartInfo/CartInfo";
import Panjabi from "../pages/Panjabi/Panjabi";
import Trouser from "../pages/Trouser/Trouser";
import Jersey from "../pages/Jersey/Jersey";
import Cuban_shirt from "../pages/Cuban Shirt/Cuban_shirt";
import Combo from "../pages/Combo/Combo";
import T_shirt_user from "../pages/T-Shirt/T_shirt";
import AdminT_shirt from "../pages/Admin/Product_view/T-shirt/AdminT-shirt";
import AdminPolo from "../pages/Admin/Product_view/Polo/AdminPolo";
import AdminTrouser from "../pages/Admin/Product_view/Trouser/AdminTrouser";
import AdminJersey from "../pages/Admin/Product_view/Jersey/AdminJersey";
import AdminShirt from "../pages/Admin/Product_view/shirt/AdminShirt";
import AdminPanjabi from "../pages/Admin/Product_view/Panjabi/AdminPanjabi";
import EditNew from "../pages/Admin/EditNew/EditNew";
import Edit_combo from "../pages/Admin/Edit_Combo/Edit_combo";
import AllProduct from "../pages/Admin/All Product/AllProduct";
import BannerManage from "../pages/Admin/BannerManage/BannerManage";
import CartPage from "../pages/User/CartfPage/CartPage";
import OrdersPage from "../pages/User/OrderPage/OrdersPage";
import AdminOrdersPage from "../pages/Admin/AdminOrdersPage/AdminOrdersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error_page />,
    children: [
      { path: "/", element: <Home /> },
      { path: "Login", element: <Login /> },
      { path: "Registration", element: <Registration /> },

      { path: "T-Shirt", element: <T_shirt_user /> },
      { path: "Polo", element: <Polo /> },
      { path: "Panjabi", element: <Panjabi /> },
      { path: "Trouser", element: <Trouser /> },
      { path: "Jersey", element: <Jersey /> },
      { path: "Cuban-Shirt", element: <Cuban_shirt /> },
      { path: "Combo", element: <Combo /> },

      { path: "About Us", element: <About_us /> },
      {
        path: "Product_details/:id",
        element: <Product_details />,
        loader: async ({ params }) =>
          axiosSecure.get(`/Product/${params.id}`).then(r => r.data),
      },
      { path: "CartInfo", element: <CartInfo /> },
    ],
  },

  {
    path: "admin",
    element: <Dash_main />,
    errorElement: <Admin_error_page />,
    children: [
      { path: "/admin", element: <Dashboard /> },

      {
        path: "T-Shirt",
        element: <AdminT_shirt></AdminT_shirt>,
        loader: async () => axiosSecure.get("/Category/T-Shirt").then(r => r.data),
      },
      {
        path: "Polo",
        element: <AdminPolo></AdminPolo>,
        loader: async () => axiosSecure.get("/Category/Polo").then(r => r.data),
      },
      {
        path: "Panjabi",
        element: <AdminPanjabi />,
        loader: async () => axiosSecure.get("/Category/Panjabi").then(r => r.data),
      },
      {
        path: "Trouser",
        element: <AdminTrouser />,
        loader: async () => axiosSecure.get("/Category/Trouser").then(r => r.data),
      },
      {
        path: "Jersey",
        element: <AdminJersey />,
        loader: async () => axiosSecure.get("/Category/Jersey").then(r => r.data),
      },
      {
        path: "Shirt",
        element: <AdminShirt />,
        loader: async () => axiosSecure.get("/Category/Shirt").then(r => r.data),
      },
      {
        path: "Edit_Combo",
        element: <Edit_combo />,
        loader: async () => axiosSecure.get("/Combo").then(r => r.data),
      },
      {
        path: "Edit_New",
        element: <EditNew />,
        loader: async () => axiosSecure.get("/NewArrival").then(r => r.data),
      },
      {
        path: "Edit_Offer",
        element: <Edit_offer />,
        loader: async () => axiosSecure.get("/OfferProduct").then(r => r.data),
      },
      {
        path: "BannerManage",
        element: <BannerManage />,
        loader: async () => axiosSecure.get("/banner").then(r => r.data),
      },
      { path: "Add_Product", element: <Add_product /> },
      {
        path: "Edit_Product/:id", element: <Edit_product />, loader: async ({ params }) =>
          axiosSecure.get(`/Product/${params.id}`).then(r => r.data),
      },
      { path: "All_Product", element: <AllProduct /> },
      { path: "Cart", element: <CartPage /> },
      {
        path: "Order/:email", element: <OrdersPage />, loader: async ({ params }) =>
          axiosSecure.get(`/UserOrder/${params.email}`).then(r => r.data),
      },
      {
        path: "AllOrder", element: <AdminOrdersPage />, loader: async () =>
          axiosSecure.get(`/AllOrder`).then(r => r.data),
      },
    ],
  },
]);
