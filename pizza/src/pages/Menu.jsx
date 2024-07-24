import menuPizza from './static/menuPizza.jpg'
import first from './static/2.png';
import second from './static/5.png';
import carsoImage from './static/3.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Menu() {
    const [show,setShow]=useState([])
        useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/allitems").then((res)=>{
            console.log(res.data)
            setShow(res.data)
        })
    },[])
    return (
        <>
            <section>
                <div className="menuImage relative">
                    <img srcSet={menuPizza} className='sm:bg-cover sm:w-full sm:h-[34rem]' alt="" />
                    <div className="menu-title absolute text-white text-center mx-auto left-[30%] top-[5rem] sm:top-[14rem] sm:left-[35%]">
                        <h1 className='font-bold text-3xl sm:text-7xl'>Menu Item</h1>
                        <p className='italic sm:text-3xl'>Only for you!!</p>
                    </div>
                </div>
                <div className="container mx-auto p-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 my-4 gap-4">
                        {show.map((item,index)=>{
                            return(


                        <div className='text-center bg-slate-100 rounded-3xl max-h-[480px]'>
                            <div className='w-[12rem] mx-auto p-3'>
                                <img srcSet={`http://localhost:8000/`+item.photo} alt="" className='w-full' />
                            </div>
                            <h1 className='font-bold text-3xl p-2'>{item.title}</h1>
                            <p maxLength="140" >{item.titleDescription}</p>
                            <div className="inline-flex space-x-2 p-3">
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl line-through'>Rs. {item.price}</p>
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl'>Rs.{item.discount}</p>
                            </div>
                            <div className="btn p-3 inline-flex space-x-4">
                                <Link className='py-3 px-4 bg-red-500 rounded-2xl text-white hover:bg-red-300 hover:text-black' to={"/menuitem/"+item._id}>Order Now</Link>
                                {item.isCustomizable=="true"?
                                <Link className='py-3 px-4 bg-yellow-500 rounded-2xl text-white hover:bg-yellow-300 hover:text-black' to={"/menuitem/"+item._id}>Customizable</Link>
                                :
                                <a className='py-3 px-4 bg-yellow-500 rounded-2xl text-white cursor-not-allowed '>Customizable</a>
                                }
                            </div>
                        </div>
                            )
                        })}
                        <div className='text-center bg-slate-100 rounded-3xl max-h-[480px]'>
                            <div className='w-[12rem] mx-auto p-3'>
                                <img srcSet={carsoImage} alt="" className='w-full' />
                            </div>
                            <h1 className='font-bold text-3xl p-2'>Four Cheese</h1>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus suscipit deserunt alias, asperiores ratione ab laboriosam perspiciatis quas.</p>
                            <div className="inline-flex space-x-2 p-3">
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl line-through'>Rs.1000</p>
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl'>Rs.900</p>
                            </div>
                            <div className="btn p-3 inline-flex space-x-4">
                                <a className='py-3 px-4 bg-red-500 rounded-2xl text-white hover:bg-red-300 hover:text-black' href="#">Order Now</a>
                                <a className='py-3 px-4 bg-yellow-500 rounded-2xl text-white hover:bg-yellow-300 hover:text-black' href="#">Customizable</a>
                            </div>
                        </div>
                        <div className='text-center bg-slate-100 rounded-3xl max-h-[480px]'>
                            <div className='w-[12rem] mx-auto p-3'>
                                <img srcSet={second} alt="" className='w-full' />
                            </div>
                            <h1 className='font-bold text-3xl p-2'>Vegetarian</h1>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus suscipit deserunt alias, asperiores ratione ab laboriosam perspiciatis quas.</p>
                            <div className="inline-flex space-x-2 p-3">
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl line-through'>Rs.1000</p>
                                <p className='py-2 px-3 border-2 border-solid rounded-3xl'>Rs.980</p>
                            </div>
                            <div className="btn p-3 inline-flex space-x-4">
                                <a className='py-3 px-4 bg-red-500 rounded-2xl text-white hover:bg-red-300 hover:text-black' href="#">Order Now</a>
                                <a className='py-3 px-4 bg-yellow-500 rounded-2xl text-white hover:bg-yellow-300 hover:text-black' href="#">Customizable</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}