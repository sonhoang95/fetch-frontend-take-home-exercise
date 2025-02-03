"use client";

import React, { useState, useEffect } from "react";
import { fetchBreeds, fetchDogs } from "@/app/utils/dogs";
import { Label } from "@/components/ui/label";
import { Dog } from "../utils/types";
import DogCard from "../components/DogCard";
import BreedSelect from "../components/BreedSelect";

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

  return (
    <div>
      <BreedSelect
        breeds={breeds}
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />
      <button
        onClick={() =>
          setSortOrder(sortOrder === "breed:asc" ? "breed:desc" : "breed:asc")
        }
      >
        Toggle Sort Order
      </button>

      {/* Display Dogs */}
      <div className="grid grid-cols-6 gap-6">
        {dogs?.length === 0 ? (
          <p>No dogs found</p>
        ) : (
          dogs?.map((dog) => <DogCard key={dog.id} {...dog} />)
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
