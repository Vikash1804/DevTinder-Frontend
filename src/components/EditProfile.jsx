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

  const handleEdit = async () => {
    setError("");
    setSuccess("");

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
      console.log(err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong"
      );
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-start gap-10 my-10">

      {/* EDIT PROFILE */}
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">

          <h2 className="flex justify-center text-3xl font-bold mb-4">
            Edit Profile
          </h2>

          {/* FIRST NAME */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                First Name
              </span>
            </label>

            <input
              type="text"
              value={firstName}
              className="input input-bordered"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* LAST NAME */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                Last Name
              </span>
            </label>

            <input
              type="text"
              value={lastName}
              className="input input-bordered"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* AGE */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                Age
              </span>
            </label>

            <input
              type="number"
              value={age}
              className="input input-bordered"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* GENDER */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                Gender
              </span>
            </label>

            <select
              value={gender}
              className="select select-bordered w-full"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* PHOTO URL */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                Photo URL
              </span>
            </label>

            <input
              type="text"
              value={photoUrl}
              className="input input-bordered"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* SKILLS */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                Skills
              </span>
            </label>

            <input
              type="text"
              value={skills}
              className="input input-bordered"
              placeholder="React, Node.js, MongoDB"
              onChange={(e) => setSkills(e.target.value)}
            />

            <span className="text-sm opacity-60 mt-1">
              Separate skills with commas
            </span>
          </div>

          {/* ABOUT */}
          <div className="form-control py-2">
            <label className="label p-2">
              <span className="label-text text-xl font-bold">
                About
              </span>
            </label>

            <textarea
              value={about}
              className="textarea textarea-bordered h-32"
              placeholder="Write something about yourself..."
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-center mt-2">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-500 text-center mt-2">
              {success}
            </p>
          )}

          {/* BUTTON */}
          <div className="card-actions justify-center py-4">
            <button
              className="btn btn-primary"
              onClick={handleEdit}
            >
              Save Profile
            </button>
          </div>

        </div>
      </div>

      {/* LIVE PREVIEW */}
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
  );
};

export default EditProfile;