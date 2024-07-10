import React, { useEffect, useState } from "react";
import Form from "./Form";

export default function AddPerson() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    setData(storedData);

    console.log(storedData);
  }, []);

  const getUpdatedData = (newPerson) => {
    setData([...data, newPerson]);

    setShowForm(false);
  };

  const handleAddPersone = () => {
    setShowForm((prev) => !prev);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedData));
    setData(updatedData);
  };

  return (
    <div className="border max-w-[80%] relative h-full  mt-20 mx-auto min-h-[50dvh] border-black">
      <h2 className="border border-black inline-block px-8 py-2">
        Add New Person
      </h2>
      <div className="flex flex-col cursor-grab overflow-x-scroll h-full justify-between max-w-[95%] mx-auto">
        <table className="min-w-full mt-8 bg-blue-600 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Date of Birth</th>
              <th className="py-2 px-4 border">Aadhar Number</th>
              <th className="py-2 px-4 border">Mobile Number</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-center cursor-pointer">
            {data.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.date}</td>
                  <td className="py-2 px-4 border">{item.aadharNumber}</td>
                  <td className="py-2 px-4 border">{item.mobileNumber}</td>
                  <td className="py-2 px-4 border">{item.age}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showForm && <Form getData={getUpdatedData} />}
        <button
          onClick={handleAddPersone}
          className="w-fit absolute bottom-1 right-4 bg-pink-300 text-white px-4 py-2 rounded-md capitalize hover:bg-blue-800 transition duration-200"
        >
          Add Person
        </button>
      </div>
    </div>
  );
}
