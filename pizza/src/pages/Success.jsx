import right from './static/new2.png'
import { Link } from "react-router-dom";
export default function Success(){
    return (
      <>
        <section>
          <div className="container mx-auto p-2 text-center space-y-3">
            <img className="w-[8rem] ml-[7.5rem] mt-[3rem] sm:w-[10rem] sm:ml-[34.5rem]" src={right} alt="" srcset="" />
            <h1 className="p-2 font-bold text-lg">Payment Success</h1>
            <p className='text-sm'>Your order coming soon wait and chill</p>
            <div>

            <Link className="p-2 mt-[2rem] text-white bg-green-600" to="/">Order</Link>
            </div>
          </div>
        </section>
      </>
    );
}