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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/Login',
            element:<Login></Login>
        },
        {
            path:'/Registration',
            element:<Registration></Registration>
        },
        {
            path:'T-Shirt/Drop Shoulder',
            element:<Drop_shoulder></Drop_shoulder>
        },
        {
            path:'T-Shirt/V Neck',
            element:<V_neck></V_neck>
        },
        {
            path:'T-Shirt/Turtle Neck',
            element:<Turtle_neck></Turtle_neck>
        },
        {
            path:'T-Shirt/Polo',
            element:<Polo></Polo>
        },
        {
            path:'T-Shirt/Pocket',
            element:<Pocket></Pocket>
        },
        {
            path:'Jursey/Club',
            element:<Club_Jursey></Club_Jursey>
        },
        {
            path:'Jursey/Basic Jursey',
            element:<Basic_Jursey></Basic_Jursey>
        },
        {
            path:'About Us',
            element:<About_us></About_us>
        },
    ]
  },
]);
