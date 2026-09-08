import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'


const Body = () => {
  const navigate = useNavigate();
  const userdata = useSelector(store => store.user)
  const dispatch = useDispatch();
  const fetchUser = async ()=>{
    try{
    const res = await axios.get(BASE_URL + "/profile/view",{
       withCredentials: true,
    });
  
    dispatch(addUser(res.data));
  }
  catch(err){
    if(err.status===401){
    navigate("/login")
    }
    console.log(err);
  }
  }

 const call =  useEffect(()=>{
    if(!userdata){
    fetchUser();
    }
  },[])

  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body
