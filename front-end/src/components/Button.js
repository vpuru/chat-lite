import React from "react";
import "./tailwind.css";

const Button = ({ name }) => {
  return (
    <a href={`/room/${name}`}>
      <div>
        <p className="py-4 w-60 m-3 font-bold shadow rounded-lg flex items-center justify-center bg-green-300 hover:bg-green-500 duration-200">
          {name}
        </p>
      </div>
    </a>
  );
};

export default Button;
