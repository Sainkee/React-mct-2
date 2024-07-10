import React, { useState } from "react";
import AddPerson from "./AddPerson";
import FindOne from "./FindOne";

export default function Head() {
  const [activeTab, setActiveTab] = useState("add");

  const handletab = (e) => {
    if (e.target.innerText === "retrieve information") {
      setActiveTab("retrieve");
    }
    if (e.target.innerText === "add new person") {
      setActiveTab("add");
    }
  };

  return (
    <div>
      <h1 className="bg-blue-600 text-center py-2 text-3xl font-normal text-white">
        Santosh kumar Directory App
      </h1>
      <div className="flex justify-start max-w-[80%] mx-auto gap-4 mt-4">
        {["add new person", "retrieve information"].map((item, index) => (
          <button
            key={index}
            onClick={(e) => handletab(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {item}
          </button>
        ))}
      </div>{" "}
      <div className="">
        {activeTab === "add" && <AddPerson />}
        {activeTab === "retrieve" && <FindOne />}
      </div>
    </div>
  );
}
