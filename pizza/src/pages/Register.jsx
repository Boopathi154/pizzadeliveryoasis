import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register(){
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleRegister=(e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/register',{
            name:name,
            email:email,
            password:password
        }).then((res)=>{
            setName("");
            setEmail("");
            setPassword("");
            toast(res.data.message)
            navigate('/login')
        }).catch((err)=>{
            toast("Account not created")
        })
    }
    return(
        <>
            <section>
                <div className="container mx-auto p-2 text-center space-y-3">
                    <h1 className="text-center text-lg font-bold">Register</h1>
                    <form className="space-y-4">
                        <div className="mt-2">
                            <input type="text" id="name" onChange={(e)=>setName(e.target.value)} value={name} name="name" className="border-2 border-blue-500 rounded-lg p-2" placeholder="Name" />
                        </div>
                        <div className="mt-2">
                            <input type="text" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="border-2 border-blue-500 rounded-lg p-2" placeholder="Email" />
                        </div>
                        <div className="mt-2">
                            <input type="password" id="email" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="border-2 border-blue-500 rounded-lg p-2" placeholder="Password" />
                        </div>
                        <div className="mt-2">
                            <button type="submit" onClick={handleRegister} className="py-3 px-5 bg-orange-500 rounded-lg text-white hover:bg-orange-200 hover:text-black hover:shadow-xl">Submit</button>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}