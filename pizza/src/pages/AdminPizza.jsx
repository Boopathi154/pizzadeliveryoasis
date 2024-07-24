import { useEffect } from "react"
import Admin from "./Admin"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
// import { Cookies } from "react-cookie"
export default function AdminPizza() {
    const [show,setShow]=useState([])
    // const cookie=new Cookies()
    // const token=cookie.get("token")
    const token=localStorage.getItem("token")
    console.log(token)
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/pizzaitem",{headers:{
            "Authorization":token
        }}).then((res)=>{
            setShow(res.data)
        })
    },[])
    const handleDelete = (id) => {
        axios.delete("http://127.0.0.1:8000/api/pizzaitem/"+id, {
            headers: {
                "Authorization": token
            }
        }).then((res)=>{
            console.log(res)
        });
        window.location.reload(false);
    }
    return (
        <>
            <section className="sm:grid sm:grid-cols-4 sm:gap-4">
                <Admin />
                <div className="col-span-3">
                    <div className="container mx-auto p-2 sm:flex sm:justify-between sm:items-center">
                        <h1 className="text-xl font-bold my-7">Pizza Database/</h1>
                        <Link to="/admin/pizza/add" className="py-3 px-4 mr-7 bg-black text-white rounded-lg">Add Item</Link>
                    </div>
                    <ul>
                        {show.map((item,index)=>{
                            return(


                        <li className="sm:flex sm:space-x-3 my-11 sm:justify-between sm:items-center" key={index}>
                            <div className="container sm:mx-auto font-bold text-lg">
                                <p>{item.title}</p>
                            </div>
                            <div className="container sm:flex sm:space-x-6">
                               <Link to={"/admin/pizza/" + item._id} className="py-3 px-4 sm:bg-black sm:text-white rounded-lg">Update</Link>
                                <Link onClick={() => { handleDelete(item._id) }} className="py-3 px-4 sm:bg-black sm:text-white rounded-lg">Delete</Link>
                            </div>
                        </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}