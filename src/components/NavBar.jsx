import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
  
const NavBar = () => {
   const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogo = ()=>{
    if(user){
      navigate("/")
    }
    else{
      navigate("/login")
    }

  }
  const handlelogout = ()=>{
    try{
    const res = axios.post(BASE_URL + "/logout" ,{} ,
      {withCredentials : true},
    )
    dispatch(removeUser());
    navigate("/login");
  }
  catch(err){
    console.log(err);
  }
  }
 
  return (
  <div className="navbar bg-neutral text-neutral-content h-22">
  <div className="flex-1">
    
  <a onClick={handlelogo}  className=" p-2 text-2xl font-bold cursor-pointer ">DevTinder</a>
  </div>
  {user &&
  <div className="flex gap-2 ">
    
    <div className="dropdown dropdown-end mx-6 h">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-20 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content h-50 rounded-box z-1 mt-3 w-52 p-2 shadow bg-base-100">
        <li>
          <Link to="/profile" className="justify-between text-xl">
            Profile 
          </Link>
        </li>
        <li><Link  to = "/connections"className='text-xl'>Connection</Link></li>
        <li><Link  to = "/requests"className='text-xl'> Requests</Link></li>
        <li><a className = "text-xl"onClick={handlelogout}>Logout</a></li>
      </ul>
    </div>
  </div>
}
</div>
  )
}

export default NavBar
