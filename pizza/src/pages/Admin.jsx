import React from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Admin() {

    return (
        <>
            <div className="sm:bg-black sm:h-[42rem] sm:text-white sm:text-center">
                <h1 className="font-bold text-3xl my-2">Admin Panel</h1>
                <ul className="text-center my-10 text-lg space-y-8">
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/order">Order</Link></li>
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/notifications">Notifications</Link></li>
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/pizzabase">Pizza Base</Link></li>
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/pizzachesse">Chesse</Link></li>
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/pizzaveg">Veg</Link></li>
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/pizzasauce">Sauce</Link></li>
                    <li><Link className="sm:px-6 sm:py-3 hover:text-black hover:bg-white rounded-lg" to="/admin/pizza">Pizza</Link></li>
                </ul>
            </div>
        </>
    )
}