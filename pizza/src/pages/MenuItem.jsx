import { useEffect, useState } from "react";
import first from "./static/2.png";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export default function MenuItem() {
  const [show, setShow] = useState({
    title: "",
    photo: "",
    discount: "",
    titleDesc: "",
    id: "",
    price: "",
  });
  const [base, setBase] = useState([]);
  const [chesse, setChesse] = useState([]);
  const [sauce, setSauce] = useState([]);
  const [veg, setVeg] = useState([]);
  const [user, setUser] = useState();
  const params = useParams();
  const navigate = useNavigate();
  // const cookie=new Cookies()
  // const token=cookie.get('token')
  const token = localStorage.getItem("token");
  const [bas, setBas] = useState();
  const [chess, setChess] = useState();
  const [sauc, setSauc] = useState();
  const [ve, setVe] = useState();
  const [data, setData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [already, setAlready] = useState(false);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/items/" + params.id).then((res) => {
      setShow({
        title: res.data.title,
        photo: res.data.photo,
        discount: res.data.discount,
        titleDesc: res.data.titleDescription,
        id: params.id,
        price: res.data.discount,
      });
      setBase(res.data.base);
      setChesse(res.data.chesse);
      setVeg(res.data.veg);
      setSauce(res.data.sauce);
    });
    axios
      .get("http://127.0.0.1:8000/api/order/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUser(res.data);
      });
    axios
      .get("http://127.0.0.1:8000/api/order/getorder", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);
  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();

      axios
        .post("http://127.0.0.1:8000/api/order/getorder", {
          base: bas,
          chesse: chess,
          veg: ve,
          sauce: sauc,
          productId: params.id,
          userId: user,
        })
        .then((res) => {
          // localStorage.setItem("order",JSON.stringify(res))
          console.log(res);
          toast("Added to cart");
          navigate("/cart");
        })
        .catch((err) => {
          toast("Not send");
        });
    } else {
      toast("You are not login");
      navigate("/login");
    }
  };
  const addtocart = (e) => {
    e.preventDefault()
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let itemincart = cart.find(
        (item) =>
          item.id === show.id &&
          item.ve === ve &&
          item.chess == chess &&
          item.sauc === sauc &&
          item.bas === bas
      );
      if (itemincart) {
        cart = cart.map((item) => {
          if (
            item.id === show.id &&
            item.ve === ve &&
            item.chess === chess &&
            item.sauc === sauc &&
            item.bas === bas
          ) {
            return {
              ...item,
              quantity: item.quantity + parseInt(quantity),
              price:item.price+(show.price*parseInt(quantity))
            };
          } else {
            return item;
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        setAlready(true);
        toast("Successfully Added");
        location.reload();
      } else {
        cart = [
          ...cart,
          {
            id: show.id,
            title: show.title,
            price: show.discount*parseInt(quantity),
            ve,
            sauc,
            chess,
            bas,
            quantity,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(cart));
        toast("Successfully Added");
        location.reload();
      }
    } else {
      cart = [
        {
          title: show.title,
          price: show.discount*parseInt(quantity),
          ve,
          sauc,
          chess,
          bas,
          quantity,
          id: show.id,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cart));
      toast("Successfully Added");
    }
  };
  return (
    <>
      <section>
        <div className="container mx-auto p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="menuImage mx-auto my-4 w-[15rem] sm:w-[25rem] sm:h-[25rem] p-4 rounded-3xl bg-slate-100 space-y-11">
                <img srcSet={`http://localhost:8000/` + show.photo} alt="" />
              </div>
              <div className="text-center">
                <input type="text" value={show.id} hidden />
                <button
                  className="py-3 px-4 bg-orange-500 hover:shadow-xl hover:bg-orange-300 hover:text-black rounded-lg text-white"
                  onClick={addtocart}
                >
                  Add To Cart!
                </button>
              </div>
            </div>
            <div className="menuDescription my-2">
              <h1 className="font-bold text-2xl text-red-500">{show.title}</h1>
              <h2 className="font-bold text-xl my-4">Rs.{show.discount}</h2>
              <p className="text-slate-500 my-4">{show.titleDesc}</p>
              <div className="space-x-2">
              <label for="cars">Quantity:</label>
              <select name="quant" id="quant" onChange={(e)=>setQuantity(e.target.selectedOptions[0].text)}  form="quant">
                <option value="quantity">1</option>
                <option value="quantity">2</option>
                <option value="quantity">3</option>
                <option value="quantity">4</option>
              </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="container mx-auto p-3 bg-slate-100 rounded-xl">
                  <h1 className="p-2 text-lg font-bold">Pizza Base</h1>
                  <div className="pizzaItem space-y-5">
                    {base.map((item) => {
                      return (
                        <div className="pizza flex justify-between">
                          <div className="pizzaName space-x-3">
                            <input
                              type="radio"
                              name="pizzaBase"
                              value={item.name}
                              onChange={(e) => setBas(e.target.value)}
                              id=""
                            />
                            <label htmlFor="">{item.name}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="container mx-auto p-3 bg-slate-100 rounded-xl">
                  <h1 className="p-2 text-lg font-bold">Pizza Chesse</h1>
                  <div className="pizzaItem space-y-5">
                    {chesse.map((item) => {
                      return (
                        <div className="pizza flex justify-between">
                          <div className="pizzaName space-x-3">
                            <input
                              type="radio"
                              onChange={(e) => setChess(e.target.value)}
                              name="pizzaChesse"
                              value={item.name}
                              id=""
                            />
                            <label htmlFor="">{item.name}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="container mx-auto p-3 bg-slate-100 rounded-xl">
                  <h1 className="p-2 text-lg font-bold">Pizza Sauce</h1>
                  <div className="pizzaItem space-y-5">
                    {sauce.map((item) => {
                      return (
                        <div className="pizza flex justify-between">
                          <div className="pizzaName space-x-3">
                            <input
                              type="radio"
                              onChange={(e) => setSauc(e.target.value)}
                              name="pizzaSauce"
                              value={item.name}
                              id=""
                            />
                            <label htmlFor="">{item.name}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="container mx-auto p-3 bg-slate-100 rounded-xl">
                  <h1 className="p-2 text-lg font-bold">Pizza Veg</h1>
                  <div className="pizzaItem space-y-5">
                    {veg.map((item) => {
                      return (
                        <div className="pizza flex justify-between">
                          <div className="pizzaName space-x-3">
                            <input
                              type="radio"
                              name="pizzaVeg"
                              value={item.name}
                              onChange={(e) => setVe(e.target.value)}
                              id=""
                            />
                            <label htmlFor="">{item.name}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
