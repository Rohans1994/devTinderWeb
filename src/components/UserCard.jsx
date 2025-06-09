import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={user.imageUrl}
          className="w-full h-65 object-contain rounded-t-lg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <h2>
          I'm {user.age} years old, {user.gender}
        </h2>
        <p>{user.aboutUs}</p>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
