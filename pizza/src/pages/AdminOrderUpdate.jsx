import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function AdminOrderUpdate() {
  const [show, setShow] = useState([]);
  const [user, setUser] = useState("");
  const [update,setUpdate]=useState("")
  const token = localStorage.getItem("token");
  const params = useParams();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admincheck", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
    axios
      .get("http://127.0.0.1:8000/api/order/admin/all/" + params.id,{headers:{
        "Authorization":token
      }})
      .then((res) => {
        console.log(res.data);
        setShow(res.data);
      });
  },[]);
  const handleUpdate=(e)=>{
    e.preventDefault();
    axios.put("http://127.0.0.1:8000/api/order/admin/all/"+params.id,{update}).then((res)=>{
        console.log(res)
    });
  }
  return (
    <section>
      {user.message ? (
        <div className="container mx-auto p-2 bg-blue-100 m-2 rounded-lg">
          <div className="text-sm">Order Id:{show._id}</div>
          <div className="flex justify-between items-center">
            <div>
              {show.pizzaItem ? (
                <h1 className="font-bold text-lg">{show.pizzaItem.title}</h1>
              ) : (
                <>No</>
              )}
              <ul className="text-[10px]">
                {show.base ? (
                  <li>Base: {show.base.name ? show.base.name : <></>}</li>
                ) : (
                  <li>Base:No</li>
                )}
                {show.chesse ? (
                  <li>Chesse: {show.chesse.name ? show.chesse.name : <></>}</li>
                ) : (
                  <li>Chesse:No</li>
                )}
                {show.sauce ? (
                  <li>Sauce:{show.sauce.name ? show.sauce.name : <></>}</li>
                ) : (
                  <li>Sauce:No</li>
                )}
                {show.veg ? (
                  <li>Veg: {show.veg.name ? show.veg.name : <></>}</li>
                ) : (
                  <li>Veg:No</li>
                )}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold">
                Quantity: {show.quantity ? show.quantity : <></>}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">Price:{show.price}</p>
            </div>
          </div>
          <h1 className="text-center font-bold text-lg">Order Address</h1>
          <div className="address">
            <ul className="sm:flex sm:justify-between sm:items-center font-bold">
              <li>Floor: {show.floor}</li>
              <li>Area: {show.area} </li>
              <li>City: {show.city}</li>
              <li>Pincode: {show.pincode}</li>
            </ul>
          </div>
          <h1 className="text-center font-bold text-lg">Order Status</h1>
          <form>
            <select
              id="status"
              name="status"
              onChange={(e) => setUpdate(e.target.selectedOptions[0].text)}
            >
              <option value="status">{show.status}</option>
              <option value="status">Package</option>
              <option value="status">Out For Delivery</option>
              <option value="status">Delivered</option>
            </select>
            <button
              onClick={handleUpdate}
              className="p-2 bg-green-500 rounded-lg text-white hover:bg-green-300 hover:text-black"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-center font-bold">You are not login</h1>
        </div>
      )}
    </section>
  );
}
