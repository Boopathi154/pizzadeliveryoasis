import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import "./index.css";
import MenuItem from "./pages/MenuItem.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPizza from "./pages/AdminPizza.jsx";
import Dashboard from "./pages/userDashboard.jsx";
import ForgetPass from "./pages/ForgetPass.jsx";
import PizzaChesse from "./pages/PizzaChesse.jsx";
import PizzaChesseUpdate from "./pages/PizzaChesseUpdate.jsx";
import PizzaChesseAdd from "./pages/PizzaChesseAdd.jsx";
import PizzaBase from "./pages/PizzaBase.jsx";
import PizzaBaseUpdate from "./pages/PizzaBaseUpdate.jsx";
import PizzaBaseAdd from "./pages/PizzaBaseAdd.jsx";
import PizzaSauce from "./pages/PizzaSauce.jsx";
import PizSauceUpdate from "./pages/PizzaSauceUpdate.jsx";
import PizzaSauceAdd from "./pages/PizzaSauceAdd.jsx";
import PizzaVeg from "./pages/PizzaVeg.jsx";
import PizVegUpdate from "./pages/PIzzaVegUpdate.jsx";
import PizzaVegAdd from "./pages/PizzaVegAdd.jsx";
import AdminPizzaAdd from "./pages/AdminPizzaAdd.jsx";
import AddressForm from "./pages/AddressForm.jsx";
import AdminPizzaUpdate from "./pages/AdminPizzaUpdate.jsx";
import Cart from "./pages/Cart.jsx";
import UserContext from "./pages/context/UserContext.jsx";
import Success from "./pages/Success.jsx";
import AllOrder from "./pages/AllOrder.jsx";
import OrderItem from "./pages/OrderItem.jsx";
import AdminOrder from "./pages/AdminOrder.jsx";
import AdminOrderUpdate from "./pages/AdminOrderUpdate.jsx";
import Notifications from "./pages/Notifications.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menuitem/:id",
        element: <MenuItem />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/forget-password",
        element: <ForgetPass />,
      },
      {
        path: "dashboard/address/:id",
        element: <AddressForm />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "dashboard/allorder",
        element: <AllOrder />,
      },
      {
        path: "dashboard/allorder/:id",
        element: <OrderItem />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/pizza",
    element: <AdminPizza />,
  },
  {
    path: "/admin/pizza/add",
    element: <AdminPizzaAdd />,
  },
  {
    path: "/admin/pizza/:id",
    element: <AdminPizzaUpdate />,
  },
  {
    path: "admin/pizzachesse",
    element: <PizzaChesse />,
  },
  {
    path: "/admin/pizzachesse/update/:id",
    element: <PizzaChesseUpdate />,
  },
  {
    path: "/admin/pizzachesse/add",
    element: <PizzaChesseAdd />,
  },
  {
    path: "/admin/pizzabase",
    element: <PizzaBase />,
  },
  {
    path: "/admin/pizzabase/update/:id",
    element: <PizzaBaseUpdate />,
  },
  {
    path: "/admin/pizzabase/add",
    element: <PizzaBaseAdd />,
  },
  {
    path: "/admin/pizzasauce",
    element: <PizzaSauce />,
  },
  {
    path: "/admin/pizzasauce/update/:id",
    element: <PizSauceUpdate />,
  },
  {
    path: "/admin/pizzasauce/add",
    element: <PizzaSauceAdd />,
  },
  {
    path: "/admin/pizzaveg",
    element: <PizzaVeg />,
  },
  {
    path: "/admin/pizzaveg/update/:id",
    element: <PizVegUpdate />,
  },
  {
    path: "/admin/pizzaveg/add",
    element: <PizzaVegAdd />,
  },
  {
    path: "/admin/order",
    element: <AdminOrder />,
  },
  {
    path: "/admin/order/:id",
    element: <AdminOrderUpdate />,
  },
  {
    path: "/admin/notifications",
    element: <Notifications />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  </React.StrictMode>
);
