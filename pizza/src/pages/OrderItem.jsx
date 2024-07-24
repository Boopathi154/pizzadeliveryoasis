import { useContext, useEffect, useState, } from "react";
import { MyContext } from "./context/MyContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderItem() {
    const [show,setShow]=useState([])
    const {user,setUser}=useContext(MyContext)
    const token=localStorage.getItem("token")
    const params=useParams()
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/order/orderitem/"+params.id,{headers:{
            "Authorization":token
        }}).then((res)=>{
            console.log(res.data)
            setShow(res.data)
        });
    },[])
  return (
    <>
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
                    <li>
                      Chesse: {show.chesse.name ? show.chesse.name : <></>}
                    </li>
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
            <div className="relative">
              <div className="mb-4 flex h-5 overflow-hidden rounded-lg bg-gray-100 text-xs">
                {show.status === "Accepted" ||
                show.status === "Package" ||
                show.status === "Out For Delivery" ||
                show.status === "Delivered" ? (
                  <div
                    className="flex flex-col justify-center bg-green-500 text-white"
                    style={{ width: "25%" }}
                  >
                    <span className="text-center">Accepted</span>
                  </div>
                ) : (
                  <></>
                )}
                {show.status === "Package" ||
                show.status === "Out For Delivery" ||
                show.status === "Delivered" ? (
                  <div
                    className="flex flex-col justify-center bg-green-500 text-white"
                    style={{ width: "25%" }}
                  >
                    <span className="text-center">Package</span>
                  </div>
                ) : (
                  <></>
                )}
                {show.status === "Out For Delivery" ||
                show.status === "Delivered" ? (
                  <div
                    className="flex flex-col justify-center bg-green-500 text-white"
                    style={{ width: "25%" }}
                  >
                    <span className="text-center">Out For Delivery</span>
                  </div>
                ) : (
                  <></>
                )}
                {show.status === "Delivered" ? (
                  <div
                    className="flex flex-col justify-center bg-green-500 text-white"
                    style={{ width: "25%" }}
                  >
                    <span className="text-center">Delivered</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-center font-bold">You are not login</h1>
          </div>
        )}
      </section>
    </>
  );
}
