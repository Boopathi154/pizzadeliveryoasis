import axios from "axios";
import React, { useEffect } from "react"
import { useState } from "react"
// import { Cookies } from 'react-cookie';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
    const [oldpassword, setOldpassword] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [rpassword, setRpassword] = useState("")
    const [valid, setValid] = useState(false)
    const navigate=useNavigate();
    const userValid = () => {
        // const cookie = new Cookies()
        // const token = cookie.get("token")
        const token=localStorage.getItem("token")
        axios.get("http://127.0.0.1:8000/api/forget-password", {
            headers: {
                "Authorization": token
            }
        }).then((res) => {
            console.log(res.data)
            setValid(res.data.id)
        })
    }
    useEffect(() => {
        userValid();
    }, [])
    const handleForgetPass = (e) => {
        // e.preventDefault()
        if (valid) {
            if (newpassword == rpassword) {
                axios.post("http://127.0.0.1:8000/api/forget-password", { password: oldpassword, newpassword: newpassword,user_id:valid }).then(()=>{
                    setOldpassword("");
                    setNewpassword("");
                    setRpassword("");
                    toast("Your password Successfully changed");
                    navigate("/dashboard")
                }).catch((err)=>{
                    toast("Password not changed");
                    navigate("/dashboard")
                })
            } else {
                toast("Password Not matching")
            }
        }else{
            toast("You are not right user")
        }
    }
    return (
        <>
            <section>
                <div className="container mx-auto p-2 text-center space-y-3">
                    <h1 className="text-center text-lg font-bold">Changing Password</h1>
                    <form className="space-y-4">
                        <div className="mt-2">
                            <input type="text" hidden value={valid} onChange={(e)=>setValid(e.target.value)} />
                            <input type="text" id="oldpassword" name="oldpassword" value={oldpassword} onChange={(e) => setOldpassword(e.target.value)} className="border-2 border-blue-500 rounded-lg p-2" placeholder="Enter Old Password" />
                        </div>
                        <div className="mt-2">
                            <input type="password" name="newpassword" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} id="newpassword" className="border-2 border-blue-500 rounded-lg p-2" placeholder="Enter Current Password" />
                        </div>
                        <div className="mt-2">
                            <input type="password" name="rpassword" value={rpassword} onChange={(e) => setRpassword(e.target.value)} id="rpassword" className="border-2 border-blue-500 rounded-lg p-2" placeholder="Enter Again password" />
                        </div>
                        <div className="mt-2">
                            <button onClick={handleForgetPass} type="submit" className="py-3 px-5 bg-orange-500 rounded-lg text-white hover:bg-orange-200 hover:text-black hover:shadow-xl">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}