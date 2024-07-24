import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {MyContext} from "../pages/context/MyContext"
function Cartfunction() {
  const [show, setShow] = useState([]);
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  // const [address,setAddress]=useState({
  //   floor:"",
  //   area:"",
  //   city:"",
  //   pincode:"",
  // })
  const navigate=useNavigate();
  const [price, setPrice] = useState(0);
  const {user,setUser}=useContext(MyContext)
  useEffect(() => {
    let total = 0;
    const data = JSON.parse(localStorage.getItem("cart"?"cart":[]));
    setShow(data ? data : []);
    if(data){
      data.forEach((element) => {
        total = total + element.price;
      });
      setPrice(total);
    }
  }, []);
  const handleDelete = (title, base, chesse, sauce, veg) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const isItemInCart = cart.find(
      (cartItem) =>
        cartItem.title === title &&
        cartItem.bas === base &&
        cartItem.chess === chesse &&
        cartItem.sauc === sauce &&
        cartItem.ve === veg
    );
    if (isItemInCart) {
      const out = cart.filter(
        (cartItem) =>
          cartItem.title !== title ||
          cartItem.bas !== base ||
          cartItem.chess !== chesse ||
          cartItem.sauc !== sauce ||
          cartItem.ve !== veg
      );
      localStorage.setItem("cart", JSON.stringify(out));
      location.reload();
    }
  };
  const handlePlus = (title, base, chesse, sauce, veg, id) => {
    axios.get("http://127.0.0.1:8000/api/items/" + id).then((res) => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const isItemInCart = cart.find(
        (cartItem) =>
          cartItem.title === title &&
          cartItem.bas === base &&
          cartItem.chess === chesse &&
          cartItem.sauc === sauce &&
          cartItem.ve === veg
      );
      if (isItemInCart.quantity < 5) {
        const add = cart.map((item) => {
          return {
            ...item,
            quantity: item.quantity + 1,
            price: item.price + res.data.discount,
          };
        });
        localStorage.setItem("cart", JSON.stringify(add));
        location.reload();
      } else {
        toast("You can't add more than 5");
      }
    });
  };
  const handleMinus = (title, base, chesse, sauce, veg, id) => {
    axios.get("http://127.0.0.1:8000/api/items/" + id).then((res) => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const isItemInCart = cart.find(
        (cartItem) =>
          cartItem.title === title &&
          cartItem.bas === base &&
          cartItem.chess === chesse &&
          cartItem.sauc === sauce &&
          cartItem.ve === veg
      );
      if (isItemInCart.quantity === 1) {
        const out = cart.filter(
          (cartItem) =>
            cartItem.title !== title ||
            cartItem.bas !== base ||
            cartItem.chess !== chesse ||
            cartItem.sauc !== sauce ||
            cartItem.ve !== veg
        );
        localStorage.setItem("cart", JSON.stringify(out));
        location.reload();
      } else {
        const out = cart.map((item) => {
          return {
            ...item,
            quantity: item.quantity - 1,
            price: item.price-res.data.discount,
          };
        });
        localStorage.setItem("cart", JSON.stringify(out));
        location.reload();
      }
    });
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
async function displayRazorpay() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razropay failed to load!!");
    return;
  }
  if (floor === "" || city === "" || area === "" || pin === "") {
    toast("Fill the all address");
  } else {
    await axios
      .post("http://127.0.0.1:8000/api/order", { price })
      .then((res) => {
        // console.log(res.data)
        const options = {
          key: "KEY_ID", // Enter the Key ID generated from the Dashboard
          amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: res.data.currency,
          name: "Pizza Hut",
          description: "Test Transaction",
          order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            try {
              await axios.post("http://127.0.0.1:8000/api/order/verify", {
                response,
                cart,
                address: { floor, area, city, pin },
                user,
              }).then((res)=>{
                toast(res.data.message)
                navigate("/success")
              }).catch((err)=>{
                toast(err)
              });
            } catch (err) {
              console.log(err);
            }
          },
          notes: {
            address: "Pizza Hut Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
  }
}

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold text-center">Cart</h1>
        <div className="container mx-auto p-2 grid grid-cols-1">
          <ul className="my-2 space-y-2 font-bold text-lg sm:grid sm:grid-cols-2 sm:text-center">
            <li>
              <h1 className="text-xl ">Cart Items</h1>
              {show.map((item) => {
                return (
                  <div className="flex justify-between p-2 bg-blue-100 rounded-md my-2">
                    <span className="">
                      <p className="font-bold text-2xl">{item.title}</p>
                      <div className="text-[12px]">{item.bas}</div>

                      <div className="text-[12px]">
                        {item.chess ? <>{item.chess}</> : <></>}
                      </div>
                      <div className="text-[12px]">
                        {item.sauc ? <>{item.sauc}</> : <></>}
                      </div>
                      <div className="text-[12px]">
                        {item.ve ? <>{item.ve}</> : <></>}
                      </div>
                    </span>
                    <div className="space-x-4">
                      <span
                        onClick={() =>
                          handlePlus(
                            item.title,
                            item.bas,
                            item.chess,
                            item.sauc,
                            item.ve,
                            item.id
                          )
                        }
                        className="p-2 bg-blue-500 rounded-md cursor-pointer text-white"
                      >
                        +
                      </span>
                      <span>{item.quantity}</span>
                      <span
                        onClick={() =>
                          handleMinus(
                            item.title,
                            item.bas,
                            item.chess,
                            item.sauc,
                            item.ve,
                            item.id
                          )
                        }
                        className="p-2 bg-blue-500 rounded-md cursor-pointer text-white"
                      >
                        -
                      </span>
                    </div>
                    <Link
                      onClick={() =>
                        handleDelete(
                          item.title,
                          item.bas,
                          item.chess,
                          item.sauc,
                          item.ve
                        )
                      }
                    >
                      <i
                        className="fa fa-trash p-2 bg-red-400 text-white rounded-md cursor-pointer"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                );
              })}
            </li>
            <li>
              <h1 className="text-center text-xl italic">Total Price</h1>
              <h1 className="italic">Price+Delivery charges:{price}</h1>
            </li>
          </ul>
          <div className="container grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <div className="payment my-2"></div>
            {user.message ? (
              <div className="address">
                <h1 className="text-center font-bold text-lg">Address</h1>
                <div className="container">
                  <div className="container flex flex-col">
                    <label htmlFor="floor" className="font-bold text-lg">
                      Floor
                    </label>
                    <input
                      type="text"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      name="floor"
                      placeholder="floor Name"
                      className="p-2 border-solid border-2 rounded-lg"
                    />
                  </div>
                  <div className="container flex flex-col">
                    <label htmlFor="area" className="font-bold text-lg">
                      Area
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      name="area"
                      placeholder="area Name"
                      className="p-2 border-solid border-2 rounded-lg"
                    />
                  </div>
                  <div className="container flex flex-col">
                    <label htmlFor="city" className="font-bold text-lg">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      name="city"
                      placeholder="city Name"
                      className="p-2 border-solid border-2 rounded-lg"
                    />
                  </div>
                  <div className="container flex flex-col">
                    <label htmlFor="pincode" className="font-bold text-lg">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      name="pincode"
                      placeholder="pincode Name"
                      className="p-2 border-solid border-2 rounded-lg"
                    />
                  </div>
                  <div className="container flex flex-col">
                    <button
                      type="submit"
                      onClick={displayRazorpay}
                      className="py-3 px-4 text-white bg-black rounded-lg"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>You are not login.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cartfunction;
