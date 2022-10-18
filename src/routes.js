import { useRoutes } from "react-router-dom";
import Signin from "./modules/auth/pages/Signin";
import CreateCar from "./modules/car/pages/CreateCar";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/car",
      element: <CreateCar />,
      // element: <User />,
      //   children: [
      //     { path: '', element: <CreateCar /> },
      //   ],
    },
    {
      path: "/",
      element: <Signin />,
    },
  ]);
}
