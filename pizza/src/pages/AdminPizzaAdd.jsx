import { useState } from "react"
import Admin from "./Admin"
import axios from "axios";

export default function AdminPizzaAdd() {
    const [title, setTitle] = useState("");
    const [photo,setPhoto]=useState("");
    const [price,setPrice]=useState("");
    const [discount,setDiscount]=useState("");
    const [titleDesc,setTitleDesc]=useState("");
    const [desc,setDesc]=useState("");
    const [customizable,setCustomizable]=useState("");
    const handleQtn = (e) => {
        e.preventDefault();
        const formdata=new FormData()
        formdata.append('title',title)
        formdata.append('file',photo)
        formdata.append('price',price)
        formdata.append('discount',discount)
        formdata.append('titleDesc',titleDesc)
        formdata.append('desc',desc)
        formdata.append('customizable',customizable)
        axios.post("http://127.0.0.1:8000/api/pizzaitem",formdata).then((res) => {
            console.log(res.data)
            setTitle("")
            setPhoto("")
            setPrice("")
            setDiscount("")
            setTitleDesc("")
            setDesc("")
            setCustomizable("")
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
                                <label htmlFor="title" className="font-bold text-lg">Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" name="title" placeholder="Enter the Title" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="photo" className="font-bold text-lg">Thumbnail</label>
                                <input type="file" onChange={(e)=>setPhoto(e.target.files[0])} id="photo" name="photo" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="price" className="font-bold text-lg">Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="price" name="price" placeholder="Enter the Price" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="discount" className="font-bold text-lg">Discount</label>
                                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} id="discount" name="discount" placeholder="Enter the discount" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="titleDesc" className="font-bold text-lg">Title Description</label>
                                <input type="text" value={titleDesc} onChange={(e) => setTitleDesc(e.target.value)} id="titleDesc" name="titleDesc" placeholder="Enter the titleDesc" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="desc" className="font-bold text-lg">Description</label>
                                <input type="textarea" value={desc} onChange={(e) => setDesc(e.target.value)} id="desc" name="desc" placeholder="Enter the description" className="p-2 border-solid border-2 rounded-lg" />
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="desc" className="font-bold text-lg">Is Customizable?</label>
                                <input type="text" value={customizable} onChange={(e) => setCustomizable(e.target.value)} id="desc" name="custom" placeholder="Type true of false as it is."  className="p-2 border-solid border-2 rounded-lg" />
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