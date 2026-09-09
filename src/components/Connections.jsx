import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addconnections } from "../utils/ConnectionSlice"

const Connections = () => {
    const connection = useSelector(store => store.connections)
    const dispatch = useDispatch();

    const fetchConnections = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/allConnection", {
                withCredentials: true,
            })
            dispatch(addconnections(res.data.data))
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-baseline gap-3 mb-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Connections
                        </h1>
                        <span className="text-slate-400 text-lg">
                            {connection?.length || 0}
                        </span>
                    </div>
                    <p className="text-slate-400 text-base">
                        Your network of developers
                    </p>
                </div>

                {/* Empty State */}
                {!connection || connection.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-slate-400 text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl font-medium mb-2">No connections yet</p>
                            <p className="text-sm">Start connecting with developers</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {connection.map((user) => (
                            <div
                                key={user._id}
                                className="group relative bg-slate-800/40 border border-slate-700/60 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>

                                <div className="relative flex flex-col md:flex-row md:items-start gap-5">
                                    
                                    {/* Profile Image */}
                                    <div className="flex-shrink-0">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                                            <img
                                                src={user.photoUrl}
                                                alt={user.firstName}
                                                className="w-full h-full rounded-lg object-cover ring-2 ring-slate-600 group-hover:ring-blue-500 transition-all duration-300"
                                            />
                                                                                    </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        
                                        {/* Name & Basic Info */}
                                        <div className="mb-3">
                                            <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {user.firstName} {user.lastName}
                                            </h2>
                                            <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-300">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                                                    {user.age} years old
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                                                    {user.gender}
                                                </span>
                                            </div>
                                        </div>

                                        {/* About */}
                                        {user.about && (
                                            <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                                                {user.about}
                                            </p>
                                        )}

                                        {/* Skills */}
                                        {user.skills && user.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {user.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 group-hover:bg-blue-500/30 transition-all duration-300"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                   

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Connections