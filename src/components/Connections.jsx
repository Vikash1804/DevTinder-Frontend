import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {addconnections} from "../utils/ConnectionSlice"

const Connections = () => {
    const connection = useSelector(store=>store.connections)
   console.log("REDUX CONNECTION:", connection);
console.log("IS ARRAY:", Array.isArray(connection));
    const dispatch = useDispatch();

    const fetchConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/allConnection",
                {
                    withCredentials: true,
                }
            )
            console.log(res.data.data)
            dispatch(addconnections(res.data.data))
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[])
 return (
    <div className="min-h-screen bg-base-100 px-4 py-10">
        <div className="max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold text-white mb-8">
                My Connections
            </h1>

            <div className="flex flex-col gap-4">

                {connection?.map((user) => (
                    
                    <div
                   
                        key={user._id}
                        className="flex items-center gap-6 bg-base-300 p-5 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <img
                            src={user.photoUrl}
                            alt={user.firstName}
                            className="w-24 h-24 rounded-full object-cover"
                        />

                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white">
                                {user.firstName} {user.lastName}
                            </h2>

                            <div className="flex gap-3 text-white mt-1">
                                <span>{user.age} years</span>
                                <span>•</span>
                                <span>{user.gender}</span>
                            </div>

                            <p className="text-white mt-2">
                                {user.about}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {user.skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </div>
)
}

export default Connections
