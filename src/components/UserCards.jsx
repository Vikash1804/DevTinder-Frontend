import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromfeed } from "../utils/FeedSlice";
import axios from "axios";

const UserCards = ({ user }) => {
  const [loading, setLoading] = useState(false);
  
  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    skills,
    photoUrl,
    about,
  } = user;

  const dispatch = useDispatch();

  const handleUser = async(status, _id) => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromfeed(_id));
    }
    catch(err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-sm group">
        
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-slate-700/60 hover:border-blue-500/40">
          
          {/* Image Section */}
          <div className="relative h-96 overflow-hidden bg-slate-900">
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

            {/* Status Badge */}
           

            {/* Name & Basic Info - Overlaid on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-1">
                {firstName} {lastName}
              </h2>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  </svg>
                  {age} years
                </span>
                <span>•</span>
                <span className="capitalize flex items-center gap-1.5">
                  {gender === "male" && <span>♂</span>}
                  {gender === "female" && <span>♀</span>}
                  {gender === "other" && <span>◆</span>}
                  {gender}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">

            {/* About Section */}
            {about && (
              <div>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  "{about}"
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Skills & Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/60 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-700/50">
              
              {/* Ignore Button */}
              <button
                onClick={() => handleUser("ignored", _id)}
                disabled={loading}
                className="flex-1 group/btn relative px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-red-500/50 text-slate-300 hover:text-red-300 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover/btn:from-red-500/10 group-hover/btn:to-red-500/0 transition-all duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Pass
                </div>
              </button>

              {/* Interested Button */}
              <button
                onClick={() => handleUser("interested", _id)}
                disabled={loading}
                className="flex-1 group/btn relative px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 disabled:scale-100 overflow-hidden"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      Like
                    </>
                  )}
                </div>
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserCards;