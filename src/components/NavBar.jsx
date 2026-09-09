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
  
  const handlelogout = async ()=>{
    try{
      await axios.post(BASE_URL + "/logout" ,{} ,
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
    <nav className="navbar bg-gradient-to-r from-slate-900 to-slate-800 text-white border-b border-slate-700/50 sticky top-0 z-50">
      <div className="flex-1">
        <button 
          onClick={handlelogo}  
          className="btn btn-ghost text-2xl font-bold hover:bg-slate-700/50 transition"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">DT</span>
          </div>
          DevTinder
        </button>
      </div>

      {user && (
        <div className="flex gap-4 items-center">
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle avatar ring-2 ring-blue-500/30 hover:ring-blue-500/60 transition"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  alt="User Avatar"
                  src={user.photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu rounded-lg z-50 w-56 p-2 shadow-2xl bg-slate-800 border border-slate-700"
            >
              <li>
                <Link 
                  to="/profile" 
                  className="text-base font-medium hover:bg-blue-600/20 transition rounded-lg py-2 px-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile 
                </Link>
              </li>
              <li>
                <Link  
                  to="/connections" 
                  className="text-base font-medium hover:bg-blue-600/20 transition rounded-lg py-2 px-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Connections
                </Link>
              </li>
              <li>
                <Link  
                  to="/requests" 
                  className="text-base font-medium hover:bg-blue-600/20 transition rounded-lg py-2 px-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Requests
                </Link>
              </li>
              <li className="border-t border-slate-700">
                <a 
                  onClick={handlelogout}
                  className="text-base font-medium text-red-400 hover:bg-red-600/20 transition rounded-lg py-2 px-3 mt-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar