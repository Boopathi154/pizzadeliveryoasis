import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { toast } from "react-toastify";
export default function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [cookie,setCookie]=useCookies()
    const handleLogin=(e)=>{
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/api/login",{
            email:email,
            password:password
        }).then((res)=>{
            if (res.data.isLogin) {
                setCookie("token", res.data.token)
                localStorage.setItem('token',res.data.token)
                toast(res.data.message)
                navigate('/')
                location.reload();
            } else {
                console.log("You are not login ");
                toast(res.data.message+" not login")
                navigate("/login")
            }
        })
    }
    return (
        <>
            <section>
                <div className="container mx-auto p-2 text-center space-y-3">
                    <h1 className="text-center text-lg font-bold">Login</h1>
                    <form className="space-y-4">
                        <div className="mt-2">
                            <input type="text" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border-2 border-blue-500 rounded-lg p-2" placeholder="Email" />
                        </div>
                        <div className="mt-2">
                            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="email" className="border-2 border-blue-500 rounded-lg p-2" placeholder="Password" />
                        </div>
                        <div className="mt-2">
                            <button onClick={handleLogin} type="submit" className="py-3 px-5 bg-orange-500 rounded-lg text-white hover:bg-orange-200 hover:text-black hover:shadow-xl">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}