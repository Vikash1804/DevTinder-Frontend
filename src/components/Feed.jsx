import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { adduserfeed } from '../utils/FeedSlice';
import UserCards from './UserCards';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const Userfeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(adduserfeed(res.data.data));
    }
    catch(err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Userfeed();
  }, []);

  // Loading State
  if(loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading profiles...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if(feed.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-slate-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">No New Profiles</h1>
          <p className="text-slate-400 text-lg mb-8">
            You've seen everyone! Check back later for more developers.
          </p>
          <button 
            onClick={Userfeed}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Discover
              </h1>
              <p className="text-slate-400">
                Find amazing developers to connect with
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Profiles remaining</p>
              <p className="text-3xl font-bold text-blue-400">{feed.length}</p>
            </div>
          </div>
        </div>

        {/* User Card Container */}
        <div className="relative">
          <UserCards user={feed[0]} />
          
          {/* Profile Counter */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <div className="h-1 bg-slate-700 flex-1 rounded-full"></div>
            <span className="text-xs text-slate-400 font-medium">
              1 of {feed.length}
            </span>
            <div className="h-1 bg-slate-700 flex-1 rounded-full"></div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-lg p-4 hover:border-blue-500/40 transition-all">
            <svg className="w-6 h-6 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Like</span> profiles you're interested in
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-lg p-4 hover:border-blue-500/40 transition-all">
            <svg className="w-6 h-6 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Pass</span> on those you don't connect with
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-lg p-4 hover:border-blue-500/40 transition-all">
            <svg className="w-6 h-6 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Connect</span> and build your network
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Feed;