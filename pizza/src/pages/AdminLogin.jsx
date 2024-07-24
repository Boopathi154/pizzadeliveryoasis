import axios from "axios";
import React from "react"
import { useState } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export default function AdminLogin(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    // const [cookie,setCookie]=useCookies();
    const handleAdminLogin=(e)=>{
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/admin/login",{email:email,password:password}).then((res)=>{
            if (res.data.isLogin) {
                // setCookie("token", res.data.token)
                localStorage.setItem("token",res.data.token)
                // toast(res.data.message)
                navigate('/admin/pizza')
                location.reload();
            } else {
                console.log("You are not login ");
                res.data.message
                navigate("/admin")
            }
        })
    }
    return(
        <>
            <section>
                <div className="container mx-auto p-2 text-center">
                    <h1 className="text-center text-lg font-bold">Admin Login</h1>
                    <form action="/" method="post" className="space-y-4">
                        <div className="mt-2">
                            <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" value={email} id="email" className="border-2 border-blue-500 rounded-lg p-2" placeholder="Email" />
                        </div>
                        <div className="mt-2">
                            <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="border-2 border-blue-500 rounded-lg p-2" placeholder="Password" />
                        </div>
                        <div className="mt-2">
                            <button onClick={handleAdminLogin} type="submit" className="py-3 px-5 bg-orange-500 rounded-lg text-white hover:bg-orange-200 hover:text-black hover:shadow-xl">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}