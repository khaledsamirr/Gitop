import React from "react"
import Navbar from './components/navbar/Navbar'
import { createBrowserRouter,RouterProvider, Outlet, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import MyGigs from "./pages/myGigs/MyGigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from"./pages/messages/Messages";
import Message from "./pages/message/Message"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import BusinessPage from "./pages/business-page/BusinessPage";
import Ad from "./components/ad/Ad";




function App() {

  const queryClient=new QueryClient();

  const RequireAuth=({children})=>{
    if(localStorage.getItem("currentUser")!=="null"){
      return <Navigate to="/"/>
    }
   
    return children;
  }

  const Layout=()=>{
    return (
      <div className="app">
        <Ad/>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/gigs",
          element: <Gigs/>
        },
        {
          path:"/gig/:id",
          element: <Gig/>
        },
        {
          path:"/orders",
          element: <Orders/>
        },
        {
          path:"/mygigs",
          element: <MyGigs/>
        },
        {
          path:"/add",
          element: <Add/>
        },
        {
          path:"/messages",
          element: <Messages/>
        },
        {
          path:"/message/:id",
          element: <Message/>
        },
        {
          path: "/pay/:id",
          element: <Pay/>
        },
        {
          path:"/success",
          element: <Success/>
        }

      ]
    },
    {
      path:"/login",
      element:(<RequireAuth><Login/></RequireAuth>),
    },
    {
      path:"/register",
      element:(<RequireAuth><Register/></RequireAuth>),
    },
    {
      path:"/business",
      element:<BusinessPage/>
    }

  ])

  return(
    <>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
       </QueryClientProvider>
    </>
    )

  }

export default App
