import { Link } from "react-router"

function Home() {
  return (
    <div>
        <div className='bg-bottom  bg-[url("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png")] h-screen pt-8 flex  flex-col justify-between bg-red-400'>
            <img className='w-16 ml-4' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className="bg-white p-3 pb-7">
                <h2 className='text-3xl font-bold '>Get started with Uber</h2>
                <Link className='w-full inline-block text-center mt-5 h-10 bg-black text-white px-4 py-2 rounded' to={"/login"}>Continue<i className="ri-arrow-right-double-line"></i> </Link>

            </div>
        </div>
    </div>
  )
}

export default Home
