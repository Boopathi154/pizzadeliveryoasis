import React, { useContext } from "react";
import { Link } from "react-router-dom";
import carsoImage from './static/3.png';
import first from './static/2.png';
import second from './static/5.png';
import pizza from './static/pizza.jpg';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function Home() {
        const [show,setShow]=useState([])
        useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/homeitems").then((res)=>{
            setShow(res.data)
        })
    },[])
    return (
        <div>
            <section className=''>
                <div className="container mx-auto p-2 sm:flex sm:justify-between">
                    <div className="container text-center sm:text-left my-4 sm:my-[9rem]">
                        <span className='p-2 font-bold text-4xl'>TRULY INDIAN</span>
                        <p className='p-2 font-bold text-lg'>People disappoint, but pizza never does.</p>
                        <p className='p-2 text-black-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, commodi perspiciatis! Ex, nam. Voluptatibus dolores facilis at magnam ducimus similique provident eius,</p>
                        <div className="p-2 inline-flex space-x-3">
                            <a href="" className='py-2 px-3 bg-blue-300 hover:bg-blue-200 rounded-3xl'>Explore</a>
                            <a href="" className="py-2 px-3 bg-blue-300 hover:bg-blue-200 rounded-3xl">Review</a>
                        </div>
                    </div>
                    <div className="cotainer">
                        <img srcSet={carsoImage} alt="" />
                    </div>
                </div>
            </section>
            <section>
                <div className="container mx-auto p-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className='flex items-center justify-between space-x-3 bg-yellow-300 rounded-lg'>
                        <img srcSet={carsoImage} alt="" className='w-[8rem] mx-2 hover:animate-ping' />
                        <div className="container mx-auto space-y-2">
                            <div className='font-bold text-lg'>Veg Pizza</div>
                            <div><a href="" className='py-2 px-3 bg-blue-400 hover:text-black hover:bg-blue-200 rounded-3xl text-white'>Show</a></div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between space-x-3 bg-slate-200 rounded-lg'>
                        <img srcSet={first} alt="" className='w-[8rem] mx-2 hover:animate-ping' />
                        <div className="container mx-auto space-y-2">
                            <div className='font-bold text-lg'>NonVeg Pizza</div>
                            <div><a href="" className='py-2 px-3 bg-blue-400 hover:text-black hover:bg-blue-200 rounded-3xl text-white'>Show</a></div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between space-x-3 bg-blue-200 rounded-lg'>
                        <img srcSet={second} alt="" className='w-[8rem] mx-2 hover:animate-ping' />
                        <div className="container mx-auto space-y-2">
                            <div className='font-bold text-lg'>Mix Pizza</div>
                            <div><a href="" className='py-2 px-3 bg-blue-400 hover:text-black hover:bg-blue-200 rounded-3xl text-white'>Show</a></div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mx-auto p-2 my-5 bg-slate-100 rounded-3xl">
                    <h1 className='text-black font-bold text-3xl text-center'>Looks Our Menu</h1>
                    <div className="container my-5 sm:flex justify-between">
                        <div className="container">
                            <img srcSet={pizza} alt="" className='rounded-3xl sm:h-[50rem]' />
                        </div>
                        <div className="container p-2 text-center space-y-3">
                            <h1 className='text-[#FF0000] my-2 font-bold text-md p-2 sm:underline-offset-4'>Pizza Menu</h1>
                            <h1 className='text-black font-bold sm:text-left text-5xl p-2'>Our Passion, Our Heritage, Our Pizzas</h1>
                            <p className='text-slate-500 sm-text-left p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima expedita quo vel corporis est officiis impedit, similique at!</p>
                            <a className='py-3 px-4 bg-red-600 text-white my-4 hover:bg-red-300 rounded-xl' href="#">Check Menu</a>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mx-auto p-2 my-5">
                    <h1 className='text-center font-bold text-3xl'>Hurry Up! Order Now</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-3 my-4 gap-4">
                        {show.map((item,index)=>{
                            return(


                        <div className='text-center bg-slate-100 rounded-3xl max-h-[480px]'>
                            <div className='w-[12rem] mx-auto p-3'>
                                <img srcSet={`http://localhost:8000/`+item.photo} alt="" className='w-full' />
                            </div>
                            <h1 className='font-bold text-3xl p-2'>{item.title}</h1>
                            <p>{item.titleDescription}</p>
                            <div className="inline-flex space-x-2 p-3">
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl line-through'>Rs.{item.price}</p>
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl'>Rs.{item.discount}</p>
                            </div>
                            <div className="btn p-3 inline-flex space-x-4">
                                <Link className='py-3 px-4 bg-red-500 rounded-2xl text-white hover:bg-red-300 hover:text-black' to={"menuitem/"+item._id}>Order Now</Link>
                                {item.isCustomizable=="true"?
                                <Link className='py-3 px-4 bg-yellow-500 rounded-2xl text-white hover:bg-yellow-300 hover:text-black' to={"menuitem/"+item._id}>Customizable</Link>
                                :
                                <a className='py-3 px-4 bg-yellow-500 rounded-2xl text-white cursor-not-allowed '>Customizable</a>
                                }
                            </div>
                        </div>
                            )
                        })}
                    </div>
                    <div className="more text-center my-7">
                        <Link className='py-3 px-5 bg-red-500 text-white rounded-2xl hover:bg-white hover:border-black hover:border-2 hover:border-solid hover:text-black' to="menu">More</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}