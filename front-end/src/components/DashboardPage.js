import React from "react";
import Button from "./Button";
import "./tailwind.css";

const Dashboard = () => {
  return (
    <div className="w-full h-screen  flex justify-center my-20">
      <div className="w-full max-w-4xl h-1/2 m-10 bg-gray-200 rounded-lg shadow-lg">
        <div className="mt-14 text-center">
          <h1 className="text-4xl font-bold my-10">Chat rooms</h1>
          <div className="space-y-30">
            <Button name="USA" />
            <Button name="Europe" />
            <Button name="India" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
