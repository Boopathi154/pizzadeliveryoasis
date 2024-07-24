import { useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PizzaBaseAdd() {
    const [floor,setFloor]=useState("");
    const [area,setArea]=useState("");
    const [city,setCity]=useState("");
    const [pin, setPin] = useState("");
    const params=useParams()
    const handleQtn = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/order/user/"+params.id, {
            floor:floor,
            area:area,
            city:city,
            pin:pin,
        }).then(() => {
            setFloor("")
            setArea("")
            setCity("")
            setPin("")
            toast("Default Address Successfully created")
        })
    }

    return (
        <>
            <section className="sm:grid sm:grid-cols-4 sm:gap-4">
                <div className="col-span-3">
                    <form>
                        <div className="container mx-auto p-2 w-[28rem] space-y-4">
                            <div className="container flex flex-col">
                                <label htmlFor="floor" className="font-bold text-lg">Floor</label>
                                <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} id="floor" name="floor" placeholder="Floor Name" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="area" className="font-bold text-lg">Area</label>
                                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} name="area" placeholder="Area Name" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="city" className="font-bold text-lg">City</label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city"  placeholder="City Name" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="pin" className="font-bold text-lg">Pincode</label>
                                <input type="number" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Pincode:eg-713424" className="p-2 border-solid border-2 rounded-lg" />
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