import React, { useEffect, useState } from "react";

export default function Form({ getData }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (date) {
      setAge(calculateAge(date));
    }
  }, [date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi iam in");
    if (!/^\d{12}$/.test(aadharNumber)) {
      setError("Aadhar number must be exactly 12 digits.");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    const val = {
      name,
      date,
      age,
      aadharNumber,
      mobileNumber,
      id: crypto.randomUUID(),
    };

    getData(val);
    const existingEntries = JSON.parse(localStorage.getItem("users")) || [];

    // Add new entry to existing entries
    const updatedEntries = [...existingEntries, val];

    // Store updated entries in local storage
    localStorage.setItem("users", JSON.stringify(updatedEntries));
    setName("");
    setDate("");
    setAadharNumber("");
    setMobileNumber("");
    setAge(null);
    setError("");
  };

  return (
    <div className="bg-blue-600 my-2 overflow-x-scroll py-2 rounded-lg shadow-md">
      <h1 className="text-white text-2xl text-center mb-4">
        Fill below form for New Entry
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mt-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md  border border-gray-300 w-full md:w-auto"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 flex flex-grow-0 flex-shrink-0 rounded-md  border border-gray-300 "
          required
        />
        <input
          type="text"
          placeholder="Aadhar number"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          className="p-2 rounded-md border border-gray-300 w-full md:w-auto"
          required
        />
        <input
          type="number"
          placeholder="Mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="p-2 rounded-md border border-gray-300 w-full md:w-auto"
          required
        />
        {age !== null && (
          <input
            className="bg-white text-blue-600 px-4 py-2 rounded-md border border-gray-300 w-full md:w-auto"
            type="text"
            value={`Age: ${age}`}
            disabled
          />
        )}
        <button
          type="submit"
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200 w-full md:w-auto"
        >
          Save
        </button>
      </form>

      {error && (
        <p className="text-red-600  text-center text-sm mt-2">
          <span className="font-bold">Error:</span> {error}
        </p>
      )}
    </div>
  );
}
