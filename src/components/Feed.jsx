import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { adduserfeed } from '../utils/FeedSlice';
import UserCards from './UserCards';

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  console.log(feed)
  const dispatch = useDispatch();
  const Userfeed = async ()=>{
    try{
      const res =await axios.get(BASE_URL+"/user/feed",{
        withCredentials:true,
      })
      dispatch(adduserfeed(res.data.data));

    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    Userfeed();
  },[]);

  return (
    <div>
      <UserCards user = {feed[0]}/>
    </div>
  )
}

export default Feed
