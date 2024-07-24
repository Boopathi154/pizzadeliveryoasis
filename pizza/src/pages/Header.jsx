import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from "./context/MyContext";
export default function Header() {
    const [show, setShow] = useState(false);
    const [data,setData]=useState()
    const [count,setCount]=useState(0)
    const {user,setUser}=useContext(MyContext)
    useEffect(()=>{
        const item=JSON.parse(localStorage.getItem("cart"))
        if(item){
            setCount(item.length)
        }else{
            setCount(0)
        }
    },[])
    

    return (
      <>
        <header className="bg-black">
          <nav className="container mx-auto px-2 sm:flex sm:justify-between sm:items-center">
            <div className="p-2 flex justify-between items-center">
              <span className="text-white font-bold text-lg">
                {" "}
                <Link to="/">PizzaHut</Link>
              </span>
              <span
                className="sm:hidden"
                onClick={() => {
                  !show ? setShow(true) : setShow(false);
                }}
              >
                <i className="fa fa-bars text-white"></i>
              </span>
            </div>
            <ul
              className={
                show
                  ? "text-center text-white font-bold py-2 sm:flex sm:justify-between sm:space-x-5 sm:items-center"
                  : "text-center text-white font-bold py-2 sm:flex sm:justify-between sm:space-x-5 sm:items-center hidden"
              }
              id="btn2"
            >
              <li className="p-2 hover:bg-white hover:text-black rounded-2xl sm:space-x-2">
                <Link to="/">Home</Link>
              </li>
              <li className="p-2 hover:bg-white hover:text-black rounded-2xl sm:space-x-2">
                <Link to="/#">Blogs</Link>
              </li>
              <li className="p-2 hover:bg-white hover:text-black rounded-2xl sm:space-x-2">
                <Link to="/#">Locations</Link>
              </li>
              <li className="p-2 hover:bg-white hover:text-black rounded-2xl sm:space-x-2">
                <Link to="/#">Contact</Link>
              </li>
              {user.message ? (
                <div className="container text-white inline-flex space-x-2 justify-center py-2">
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 bg-slate-500 shadow-xl hover:bg-slate-400 rounded-lg"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/cart"
                    className="px-3 py-2 bg-slate-500 shadow-xl hover:bg-slate-400 rounded-lg space-x-3 font-bold"
                  >
                    <i
                      className="fa fa-shopping-cart text-lg"
                      aria-hidden="true"
                    >
                      {" "}
                      Cart{" "}
                    </i>
                  </Link>
                </div>
              ) : (
                <div className="container text-white inline-flex space-x-2 justify-center py-2">
                  <Link
                    className="px-3 py-2 bg-blue-900 shadow-xl hover:bg-blue-400 rounded-lg"
                    to="login"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-blue-900 shadow-xl hover:bg-blue-400 rounded-lg"
                    href="#"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/cart"
                    className="px-3 py-2 bg-blue-900 shadow-xl hover:bg-blue-400 rounded-lg space-x-2"
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>{count}</span>
                  </Link>
                </div>
              )}
            </ul>
          </nav>
        </header>
        <ToastContainer />
      </>
    );
}