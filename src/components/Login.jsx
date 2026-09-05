import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
const Login = () => {
  

const [error , seterror] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async() => {
     try{
      const res = await axios.post(BASE_URL + "/login",{
        emailId,
        password
      } , {
        withCredentials: true,
      })

       dispatch(addUser(res.data))
      navigate("/");
      }
     

      catch(err){
        seterror(err?.response?.message || "Invalid Credentials")
        console.log(err)  
     }
  }
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="flex justify-center items-center mt-25">
   <div className="card card-border bg-base-300 w-96 ">
  <div className="card-body">
    <h2 className="card-titlem flex justify-center text-3xl font-bold">Login</h2>
    <div className="form-control py-2">
      <label className="label">
        <span className="label-text text-xl font-bold">Email ID</span>
      </label>
      <input type="email"  value = {emailId}
      placeholder="Email" className="input input-bordered" 
      onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="form-control  py-2">
      <label className="label">
        <span className="label-text text-xl font-bold">Password</span>
      </label>
      <input type="password" placeholder="Password" 
      className="input input-bordered" value={password} 
      onChange={(e) => setPassword(e.target.value)} />
    </div>
    <p className='text-red-600'>{error}</p>
    <div className="card-actions justify-center py-2">
      <button className="btn btn-primary "
      onClick = {handleLogin}>
        Login
      </button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login
