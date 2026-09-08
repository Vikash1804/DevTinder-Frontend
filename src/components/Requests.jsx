
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/RequestsSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const fetchreq = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/requests/recieved",
                {
                    withCredentials: true,
                }
            );

            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchreq();
    }, []);

    const ReviewRequest = async (status, _id) => {
        try {
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
        }
    };

    return (
        <div className="min-h-screen bg-base-100 px-4 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-white mb-8">
                    Connections Requests
                </h1>

                <div className="flex flex-col gap-4">

                    {requests?.length === 0 ? (
                        <h2 className="text-xl text-white text-center">
                            No Requests Found
                        </h2>
                    ) : (
                        requests?.map((request) => {
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
                                    className="flex items-center gap-6 bg-base-300 p-5 rounded-xl shadow hover:shadow-lg transition"
                                >
                                    <img
                                        src={photoUrl}
                                        alt={firstName}
                                        className="w-24 h-24 rounded-full object-cover"
                                    />

                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-white">
                                            {firstName} {lastName}
                                        </h2>

                                        <div className="flex gap-3 text-white mt-1">
                                            <span>{age} years</span>
                                            <span>•</span>
                                            <span>{gender}</span>
                                        </div>

                                        <p className="text-white mt-2">
                                            {about}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {skills?.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="m-4 p-2">
                                            <button
                                                className="btn btn-primary mx-4"
                                                onClick={() =>
                                                    ReviewRequest(
                                                        "rejected",
                                                        request._id
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                            <button
                                                className="btn btn-secondary mx-4"
                                                onClick={() =>
                                                    ReviewRequest(
                                                        "accepted",
                                                        request._id
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}

                </div>
            </div>
        </div>
    );
};

export default Requests;

