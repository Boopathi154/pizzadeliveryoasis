import { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import axios from "axios";

const token = localStorage.getItem("token");
export default function UserContext({ children }) {
  const [user, setUser] = useState({
    message:"",
    id:"",
  });
  useEffect(()=>{
    axios
      .get("http://127.0.0.1:8000/api/checkauth", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUser({message:res.data.message,id:res.data.id})
      });
  },[])
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}
