import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/RequestsSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchreq = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                BASE_URL + "/user/requests/recieved",
                {
                    withCredentials: true,
                }
            );
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchreq();
    }, []);

    const ReviewRequest = async (status, _id) => {
        try {
            setActionLoading(_id);
            await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                {
                    withCredentials: true,
                }
            );
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-baseline gap-3 mb-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Connection Requests
                        </h1>
                        <span className="text-slate-400 text-lg">
                            {requests?.length || 0}
                        </span>
                    </div>
                    <p className="text-slate-400 text-base">
                        People who want to connect with you
                    </p>
                </div>

                {/* Empty State */}
                {!loading && (!requests || requests.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="text-slate-400 text-center">
                            <svg className="w-20 h-20 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-2xl font-medium mb-2">No requests yet</p>
                            <p className="text-sm">When someone sends you a request, it'll appear here</p>
                        </div>
                    </div>
                )}

                {/* Requests List */}
                {!loading && requests && requests.length > 0 && (
                    <div className="space-y-4">
                        {requests.map((request) => {
                            const {
                                firstName,
                                lastName,
                                gender,
                                age,
                                photoUrl,
                                skills,
                                about,
                            } = request.sender;

                            return (
                                <div
                                    key={request._id}
                                    className="group relative bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>

                                    <div className="relative flex flex-col md:flex-row md:items-start gap-6">

                                        {/* Profile Section */}
                                        <div className="flex-shrink-0">
                                            <div className="relative w-24 h-24 md:w-28 md:h-28">
                                                <img
                                                    src={photoUrl}
                                                    alt={firstName}
                                                    className="w-full h-full rounded-xl object-cover ring-2 ring-slate-600 group-hover:ring-blue-500 transition-all duration-300"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-slate-800 flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="flex-1 min-w-0">

                                            {/* Name & Basic Info */}
                                            <div className="mb-4">
                                                <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                                                    {firstName} {lastName}
                                                </h2>
                                                <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                                                    <span className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                                        </svg>
                                                        {age} years old
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        {gender === "male" && <span>♂</span>}
                                                        {gender === "female" && <span>♀</span>}
                                                        {gender === "other" && <span>◆</span>}
                                                        <span className="capitalize">{gender}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* About */}
                                            {about && (
                                                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                                                    {about}
                                                </p>
                                            )}

                                            {/* Skills */}
                                            {skills && skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 group-hover:bg-blue-500/30 transition-all duration-300"
                                                        >
                                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                {/* Reject Button */}
                                                <button
                                                    onClick={() => ReviewRequest("rejected", request._id)}
                                                    disabled={actionLoading === request._id}
                                                    className="flex-1 group/btn relative px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-red-500/50 text-slate-300 hover:text-red-300 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover/btn:from-red-500/10 group-hover/btn:to-red-500/0 transition-all duration-300"></div>
                                                    <div className="relative flex items-center justify-center gap-2">
                                                        {actionLoading === request._id ? (
                                                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
                                                            </svg>
                                                        ) : (
                                                            <>
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                Decline
                                                            </>
                                                        )}
                                                    </div>
                                                </button>

                                                {/* Accept Button */}
                                                <button
                                                    onClick={() => ReviewRequest("accepted", request._id)}
                                                    disabled={actionLoading === request._id}
                                                    className="flex-1 group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 disabled:scale-100 overflow-hidden"
                                                >
                                                    <div className="relative flex items-center justify-center gap-2">
                                                        {actionLoading === request._id ? (
                                                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
                                                            </svg>
                                                        ) : (
                                                            <>
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                Accept
                                                            </>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Requests;