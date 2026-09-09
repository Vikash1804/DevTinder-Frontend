import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCards from "./UserCards";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(
    Array.isArray(user?.skills) ? user.skills.join(", ") : user?.skills || ""
  );
  const [about, setAbout] = useState(user?.about || "");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const updatedUser = {
        firstName,
        lastName,
        age: Number(age),
        gender,
        photoUrl,
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        about,
      };

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        updatedUser,
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-white text-center py-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Edit Profile
          </h1>
          <p className="text-slate-400">Update your profile information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* FORM SECTION */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8 backdrop-blur-sm">
              
              <div className="space-y-6">
                
                {/* NAME ROW */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        First Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        Last Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* AGE AND GENDER ROW */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        Age
                      </span>
                    </label>
                    <input
                      type="number"
                      value={age}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        Gender
                      </span>
                    </label>
                    <select
                      value={gender}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* PHOTO URL */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    value={photoUrl}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                {/* SKILLS */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      Skills
                    </span>
                  </label>
                  <input
                    type="text"
                    value={skills}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="React, Node.js, MongoDB"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    💡 Separate skills with commas
                  </p>
                </div>

                {/* ABOUT */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      About
                    </span>
                  </label>
                  <textarea
                    value={about}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    placeholder="Write something about yourself..."
                    rows={4}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                {/* MESSAGES */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-400 text-sm">{success}</p>
                  </div>
                )}

                {/* BUTTON */}
                <button
                  onClick={handleEdit}
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Profile
                    </>
                  )}
                </button>

              </div>

            </div>
          </div>

          {/* PREVIEW SECTION */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">
                Live Preview
              </p>
              <UserCards
                user={{
                  firstName,
                  lastName,
                  age,
                  gender,
                  photoUrl,
                  skills: skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== ""),
                  about,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;