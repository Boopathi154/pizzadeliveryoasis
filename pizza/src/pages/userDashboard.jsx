import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import  from "react-cookie"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function userDashboard(){
    const navigate=useNavigate();
    const token=localStorage.getItem('token')
    const [show,setShow]=useState({
        name:"",
        id:"",
        email:"",
    })
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/order/user",{headers:{
            "Authorization":token
        }}).then((res)=>{
            console.log(res.data)
            setShow({
                name:res.data.name,
                id:res.data.id,
                email:res.data.email
            })
        })
    },[])

    const handleLogout=()=>{
        localStorage.removeItem('token')
        toast("You are successfully logout");
        navigate("/")
        window.location.reload(false)

    }
    return(
        <>
        {token?
        <section>
            <div className="container mx-auto p-">
                <h1 className="text-center font-bold text-xl my-4">!!Welcome {show.name}!!</h1>
                <div className="container flex space-x-3 justify-center my-6">
                    <Link to='/dashboard/allorder' className="px-4 py-3 bg-black rounded-lg text-white hover:bg-slate-600">Your Order</Link>
                    <Link to="/dashboard/forget-password" className="px-4 py-3 bg-black rounded-lg text-white hover:bg-slate-600">Forget Password</Link>
                    <Link to={"/dashboard/address/"+show.id} className="px-4 py-3 bg-black rounded-lg text-white hover:bg-slate-600">Add Default Address</Link>
                    <Link onClick={handleLogout} className="px-4 py-3 bg-black rounded-lg text-white hover:bg-slate-600">Logout</Link>
                </div>
            </div>
        </section>
        :
        <div className="container mx-auto text-center">
            You are not login
        </div>}
        </>
    )
}