import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../component/Home";
import AddCoffee from "../component/AddCoffee";
import UpdateCoffee from "../component/UpdateCoffee";
import CoffeeDetails from "../component/CoffeeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>404</div>,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add-coffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "/update-coffee/:id",
        element: <UpdateCoffee></UpdateCoffee>,
      },
      {
        path: "/coffees/:id",
        element: <CoffeeDetails></CoffeeDetails>,
      },
    ],
  },
]);
export default router;
