import React from "react";

const UserCards = ({ user }) => {
  console.log(user);

  if (!user) return null;

  const {
    firstName,
    lastName,
    age,
    gender,
    skills,
    photoUrl,
    about,
  } = user;

  return (
    <div className="flex justify-center m-10">
      <div className="card bg-base-300 w-100 p-5 shadow-sm">

        {/* Image */}
        <figure>
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-80 object-cover rounded-lg"
          />
        </figure>

        <div className="card-body">

          {/* Name */}
          <h2 className="card-title text-2xl">
            {firstName} {lastName}
          </h2>

          {/* Age & Gender */}
          <p className="text-lg">
            {age} years old • {gender}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {skills?.map((skill, index) => (
              <span
                key={index}
                className="badge badge-primary"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* About */}
          <p className="mt-3">
            {about}
          </p>

          {/* Buttons */}
          <div className="card-actions flex justify-between mt-5">
            <button className="btn btn-primary">
              Ignore
            </button>

            <button className="btn btn-secondary">
              Interested
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserCards;