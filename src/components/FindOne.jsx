import React, { useState } from "react";

export default function FindOne() {
  const [find, setFind] = useState(null);
  const [aadharNumber, setAadharNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFind = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("users"));

    if (userData) {
      const user = userData.find((item) => item.aadharNumber === aadharNumber);
      if (user) {
        setFind(user);
        setErrorMessage("");
      } else {
        setFind(null);
        setErrorMessage("No user found with this Aadhar number.");
      }
    } else {
      setFind(null);
      setErrorMessage("User data not found.");
    }
  };

  return (
    <div className="border max-w-[80%] relative h-full overflow-x-scroll mt-20 mx-auto min-h-[50vh] border-black">
      <h2 className="border border-black inline-block px-8 py-2">
        Retrieve Information
      </h2>

      <form onSubmit={handleFind} className="mt-4 w-[80%] mx-auto flex gap-4">
        <input
          type="number"
          placeholder="Enter Aadhar Number"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          className="p-2 w-[50%] rounded-md border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Find
        </button>
      </form>

      {find ? (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="text-xl font-semibold mb-2">User Information:</h3>
          <p>
            <strong>Name:</strong> {find.name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {find.date}
          </p>
          <p>
            <strong>Aadhar Number:</strong> {find.aadharNumber}
          </p>
          <p>
            <strong>Mobile Number:</strong> {find.mobileNumber}
          </p>
          <p>
            <strong>Age:</strong> {find.age}
          </p>
        </div>
      ) : (
        errorMessage && (
          <p className="mt-8 text-center text-red-600">{errorMessage}</p>
        )
      )}
    </div>
  );
}
