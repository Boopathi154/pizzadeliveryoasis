import { useEffect, useState } from "react"
import Admin from "./Admin"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PizQtnUpdate() {
    const [qtn, setQtn] = useState("");
    const [name,setName]=useState("");
    const params=useParams();
    const navigate=useNavigate();
    const token=localStorage.getItem("token")
    console.log(token)
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/type/pizzachesse/"+params.id,{headers:{
            "Authorization":token
        }}).then((res)=>{
            console.log(res.data)
            setName(res.data.name)
            setQtn(res.data.quantity)
        })
    },[])
    const handleQtn = (e) => {
        e.preventDefault();
        axios.put("http://127.0.0.1:8000/type/pizzachesse/"+params.id, {name:name, quantity: qtn }).then(() => {
            setQtn("")
            navigate("/admin/pizzachesse")
        })
    }
    return (
        <>
            <section className="sm:grid sm:grid-cols-4 sm:gap-4">
                <Admin />
                <div className="col-span-3">
                    <form>
                        <div className="container mx-auto p-2 w-[28rem] space-y-4">
                            <div className="container flex flex-col">
                                <label htmlFor="name" className="font-bold text-lg">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder="Enter the text" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="name" className="font-bold text-lg">Quantity</label>
                                <input type="number" value={qtn} onChange={(e) => setQtn(e.target.value)} id="name" name="qtn" placeholder="Enter the Stock Available" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <button onClick={handleQtn} type="submit" className="py-3 px-4 text-white bg-black rounded-lg">Add Item</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}