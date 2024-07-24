import { useContext, useEffect, useState } from "react";
import { MyContext } from "./context/MyContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllOrder() {
  const { user, setUser } = useContext(MyContext);
  const [show, setShow] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/order/allorder", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setShow(res.data);
      });
  }, []);
  return (
    <>
      <section>
        <div className="container mx-auto p-2">
          <h1 className="text-lg text-center font-bold">Your Order</h1>
          {user.message ? (
            <ul className="my-2 space-y-2 font-bold text-lg sm:grid sm:grid-cols-1 sm:text-center">
              {show.map((item) => {
                return (
                  <li
                    className="flex justify-between p-2 bg-blue-100 rounded-md my-2 items-center"
                    key={item._id}
                  >
                    <h1 className="font-bold text-sm">
                      {item.pizzaItem.title}
                    </h1>
                    <p className="font-bold text-[10px]">
                      Quantity: {item.quantity}
                    </p>
                    <p className="font-bold text-sm">Price: {item.price}</p>
                    {item.status === "Accepted" ? (
                      <p className="font-bold text-sm">Status: {item.status}</p>
                    ) : (
                      <p className="font-bold text-red-400 text-sm">
                        Status: {item.status}
                      </p>
                    )}
                    <Link to={"/dashboard/allorder/"+item._id} className="text-sm bg-green-500 hover:bg-green-300 hover:text-black p-2 rounded-md text-white">Show</Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <>You are not login</>
          )}
        </div>
      </section>
    </>
  );
}
