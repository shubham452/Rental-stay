import React,{useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { FaSearch, FaUser } from "react-icons/fa"
import {IoMdMenu} from "react-icons/io"
import {useDispatch, useSelector} from "react-redux"

const Navbar = () => {

    const [search,setSearch] = useState("");
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const dispatch= useDispatch();
    const user = useSelector((state)=>state.user);
    const navigate = useNavigate();

    console.log(user)
    const handleSearch=()=>{
        navigate(`/listings/search/${search}`);
    }
    return (
        <div className='py-[10px] sm:py-[10px] px-[20px] sm:px-[60px] flex justify-between items-center relative'>
            <Link to={'/'}>
                <h1 className='text-slate-500 text-3xl font-bold'>Home Rental</h1>
            </Link>
            <div className='flex border border-gray-500 rounded-[30px] h-[50px] px-5 gap-10 items-center'>
                <input
                    type='text'
                    placeholder='Search'
                    className='focus:outline-none bg-transparent'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                
                <button disabled={search.trim()===""} onClick={handleSearch}>
                <FaSearch/>
                </button>
            </div>
            <div>
                {user ? (
                    <Link to={'/create-listing'}>
                        Become a Host
                    </Link>
                ):(
                    <Link to={'/login'}>
                        Become a Host
                    </Link>
                )}
            
            <button onClick={()=>setDropdownMenu(!dropdownMenu)} 
            className='h-[50px] flex items-center px-[10px] border border-gray-500 rounded-[30px] gap-2.5 bg-white cursor-pointer hover:shadow-lg'>
                <IoMdMenu/>
                {!user.user ? (
                    <FaUser/>
                ):(
                    <img src={`http://localhost:3000/${user.user?.profileImagePath.replace("public\\","").replace("public/", "")}`} 
                    alt="profile photo" className='w-10 h-10 object-cover rounded-full'/>
                )}
            </button>
            {dropdownMenu && !user && (
                <div>
                    <Link to={"/login"}>Log in</Link>
                    <Link to={"/register"}>Register</Link>
                </div>
            )}
            {dropdownMenu && user && (
                <div className='absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border border-gray-300 rounded-3xl shadow-lg z-[999]'>
                    <Link to={`/${user?.user?._id}/trips`} className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500">Trip List</Link>
                
                
                    <Link to={`/${user?.user?._id}/wishList` } className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500">Wish List</Link>
                
                
                    <Link to={`/${user?.user?._id}/properties`} className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500">Property List</Link>
                
                
                    <Link to={`/${user?.user?._id}/reservations`} className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500">Reservation List</Link>

                    <Link to={`/create-listing`} className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500">Become a host</Link>

                    <Link to={`/login`} className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500">Logout</Link>
                </div>
            )}
            </div>
            
        </div>
    )
}

export default Navbar