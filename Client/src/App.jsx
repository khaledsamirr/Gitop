import React from "react"
import Navbar from './components/navbar/Navbar'
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
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




function App() {

  const queryClient=new QueryClient();

  const Layout=()=>{
    return (
      <div className="app">
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
      element:<Login/>,
    },
    {
      path:"/register",
      element:<Register/>,
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
