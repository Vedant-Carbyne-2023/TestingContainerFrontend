import { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Link, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { AdminPrivateRoute, UserPrivateRoute } from "./CommonUtitlites/PrivateRoutesValidation/PrivateRoute";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Forgot from "./Login/Forgot";
import { role } from "./CommonUtitlites/Others/commonExportVariable";
import ResetPassword from "./ForgotPassWord/ResetPassword";
  import useGetRoleWithPermission from "./CommonUtitlites/customHooks/useGetRoleWithPermission";
import Home from "./LandingPage/home";
import { routes2 } from "./Routes/userRoutes";
import { routes1 } from "./Routes/adminRoutes";
import AdminNavbar from "./CommonUtitlites/AdminNavbar/AdminNavbar";
import UserNavbar from "./CommonUtitlites/UserNavbar/UserNavbar";
import Root from "./LandingPage/Root";
import Loader from "./CommonUtitlites/Loader/Loader";
import { ThemeProvider } from "@mui/material";
import theme from "./CommonUtitlites/Others/theme";


function App() {
  const [materialRequisitionPermission, setMaterialRequisitionPermission] = useState([])
  // let components = useGetRoleWithPermission()
  // let fetched= false

  // useEffect(() => {
    
    
  //   const truePermissionsWithComponent = components.flatMap((component) => {
  //     const truePermissions = component.typeOfPermissions.filter(
  //       (typeOfPermission) => typeOfPermission.value === true
  //     );
  //     return truePermissions.map((truePermission) => ({
  //       componentName: component.nameOfComponent,
  //       permission: truePermission.permission,
  //       value: truePermission.value,
  //     }));
  //   });
    
  //     if(components.length>0 && role!="SuperUser" && !fetched){
  //     setMaterialRequisitionPermission(truePermissionsWithComponent)
  //     fetched=true
  //   }
  // }, [components])


  // const handleSeparatePermission = (string) =>{
  //   console.log(materialRequisitionPermission)
  //   let separate = materialRequisitionPermission.filter(permission => permission.componentName === string)
  //   return separate

  //  }


 const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Registration />,
        },
        {
          path: "forgot",
          element: <Forgot />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <Suspense fallback={<div>Loading</div>}>
          <AdminNavbar />
        </Suspense>
      ),
      id: "admin",
      children: routes1.map((route) => ({
        path: route.path,
        element: (
          <Suspense fallback={<div><Loader/></div>}>
              <AdminPrivateRoute isAuthenticated={isAuthenticated} userRole={role}>
            <route.element />
            </AdminPrivateRoute>
          </Suspense>
        ),
      })),
    },

    {
      path: "/user",
      element: (
        <Suspense fallback={<div><Loader/></div>}>
          <UserNavbar />
        </Suspense>
      ),
      id: "user",
      children: routes2.map((route) => ({
        path: route.path,
        element: (
          <Suspense fallback={<div><Loader/></div>}>
             <UserPrivateRoute isAuthenticated={isAuthenticated} userRole={role}>
            <route.element compPermission={route.permission}/>
            </UserPrivateRoute>
          </Suspense>
        ),
      })),
    },
  ]);
    return (
    <>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
