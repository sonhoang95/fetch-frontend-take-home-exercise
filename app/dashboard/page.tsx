"use client";

import React, { useState, useEffect } from "react";
import { fetchBreeds, fetchDogs } from "../api/auth";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

function Dashboard() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("breed:asc");
  const [favoritedDogs, setFavoritedDogs] = useState([]);

  // Fetch breeds
  useEffect(() => {
    fetchBreeds().then((breeds) => {
      // Do something with the breeds
      setBreeds(breeds);
    });
  }, []);

  // Fetch dogs based on filters
  useEffect(() => {
    fetchDogs({
      breed: selectedBreed,
      page,
      sort: sortOrder,
      ageMin: "",
      ageMax: "",
    }).then((data) => {
      setDogs(data);
    });
  }, [selectedBreed, page, sortOrder]);

  // Handle favorite dog selection
  // const toggleFavorite = (dogId) => {
  //   setFavoritedDogs((prev) =>
  //     prev.includes(dogId)
  //       ? prev.filter((id) => id !== dogId)
  //       : [...prev, dogId]
  //   );
  // };

  // Handle match
  // const handleMatch = async () => {
  //   const match = await fetchDogMatch(favoritedDogs);
  //   console.log("Match:", match);
  // };

  console.log(dogs);

  return (
    <div>
      {/* Breed Filter */}
      <div>
        <label>Select Breed:</label>
        <select
          onChange={(e) => setSelectedBreed(e.target.value)}
          value={selectedBreed}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() =>
          setSortOrder(sortOrder === "breed:asc" ? "breed:desc" : "breed:asc")
        }
      >
        Toggle Sort Order
      </button>

      {/* Display Dogs */}
      <div className="grid grid-cols-8">
        {dogs?.length === 0 ? (
          <p>No dogs found</p>
        ) : (
          dogs?.map((dog) => (
            <div key={dog.id}>
              <img
                src={dog.img}
                alt={dog.name}
                style={{ width: "150px", height: "150px" }}
              />
              <h3>{dog.name}</h3>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age}</p>
              {/* <button onClick={() => toggleFavorite(dog.id)}>
                {favoritedDogs.includes(dog.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button> */}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      {/* Match Button */}
      {/* <button onClick={handleMatch}>Generate Match</button> */}
    </div>
  );
}

export default Dashboard;
