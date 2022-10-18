import { useRoutes } from "react-router-dom";
import Signin from "./modules/auth/pages/Signin";
// import Signup from './modules/auth/pages/Signup'
// import Dashboard from './modules/Dashboard/pages/Dashboard'
import CreateCar from "./modules/car/pages/CreateCar";
// import WorkerLayout from './modules/common/components/WorkerLayout'

// ----------------------------------------------------------------------

export default function Router() {
  //   let newAccess_Token = null;
  //   newAccess_Token = localStorage.getItem('access_token');
  //   console.log("SSSSSSSSSSSSSSSSSSSS",newAccess_Token)
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
