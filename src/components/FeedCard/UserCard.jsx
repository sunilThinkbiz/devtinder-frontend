import React from 'react'

const UserCard = ({ user }) => {
 
  const{firstName,lastName,age,about,gender,skills,photoUrl}=user
  
  return (
    <div
      className="bg-white shadow-lg rounded-[30px] overflow-hidden w-80 mx-auto transition hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="h-80 w-full">
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* WHITE CURVED CONTENT BOX */}
      <div className="bg-white rounded-t-[30px] -mt-10 pt-6 pb-4 px-5 relative z-10 ">
        {/* NAME + AGE */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Name:</span>
          <h2 className="text-1xl font-bold text-gray-900">
            {firstName} {lastName}
            {age && <span className="font-medium">, {age}</span>}
          </h2>
        </div>

        {/* GENDER */}
        {gender && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Gender:</span>
            <p className="text-1xl font-bold text-gray-900  capitalize">
              {gender}
            </p>
          </div>
        )}
        {/* ALL SKILLS */}
        {skills && skills.length > 0 && (
          <div className="mt-3 flex">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Skills:</span>
            <div className="ml-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-xl"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {about && (
          <div className="mt-3">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">About:</span>
            <p className="text-gray-700 mt-1 line-clamp-3">
              {about}
            </p>
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex items-center justify-center gap-6 py-2 bg-white">
        <button className="w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center text-red-500 text-2xl">
          ✖
        </button>

        <button className="w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center text-blue-500 text-2xl">
          ⭐
        </button>

        <button className="w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center text-green-500 text-2xl">
          ❤
        </button>
      </div>
    </div>
  )
}

export default UserCard
