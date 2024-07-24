import Admin from "./Admin"
import axios from "axios";
import { useEffect, useState } from "react";
export default function Notifications(){
      const [show, setShow] = useState([]);
      const [user, setUser] = useState("");
      const token = localStorage.getItem("token");
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
      });
      axios.get("http://127.0.0.1:8000/api/order/notify",{headers:{
        "Authorization":token,
      }}).then((res)=>{
        console.log(res.data)
        setShow(res.data)
      });
    return (
      <section className="sm:grid sm:grid-cols-3 sm:gap-4">
        <Admin />
        <div className="container mx-auto p-2">
          <h1 className="text-lg text-center font-bold">Your Notifications</h1>
          {user.message ? (
            <ul className="my-2 space-y-2 font-bold text-lg sm:grid sm:grid-cols-1 sm:text-center">
                  {show.map((item)=>{
                    return(

                  <li
                    className="flex justify-between p-2 bg-blue-100 rounded-md my-2 items-center"
                    >
                      {item.name}
                  </li>
                    )
                  })}
            </ul>
          ) : (
            <>You are not login</>
          )}
        </div>
      </section>
    );
}