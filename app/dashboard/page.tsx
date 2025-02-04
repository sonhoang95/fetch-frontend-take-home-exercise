"use client";

import { fetchBreeds, fetchDogs, fetchMatchedDog } from "@/app/utils/dogs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import BreedSelect from "../components/BreedSelect";
import DogCard from "../components/DogCard";
import { Dog } from "../utils/types";

import BreedSortSelect from "../components/BreedSortSelect";
import { PagePagination } from "../components/PagePagination";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Dashboard() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sortOrder, setSortOrder] = useState("breed:asc");
  const [favoritedDogs, setFavoritedDogs] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog>();
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

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
      ageMin: "0",
      ageMax: "100",
    }).then((data) => {
      setDogs(data?.dogDetailsData);
      setTotalPages(data?.totalPages);
    });
  }, [selectedBreed, page, sortOrder]);

  // Handle favorite dog selection
  const toggleFavorite = (dogId: string) => {
    setFavoritedDogs((prev) => {
      const isFavorited = prev.includes(dogId);

      if (isFavorited) {
        toast({ title: "Removed from Favorites" });
        return prev.filter((id) => id !== dogId);
      } else {
        toast({ title: "Added to Favorites" });
        return [...prev, dogId];
      }
    });
  };

  // Handle match
  const handleMatch = async () => {
    const match = await fetchMatchedDog(favoritedDogs);
    if (match) setMatchedDog(match);
  };

  if (!isAuthenticated) {
    router.push("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <section className="my-8 container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <BreedSelect
          breeds={breeds}
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
        <div className="flex items-center space-x-6">
          <BreedSortSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
          {/* Match Button */}
          <Button onClick={handleMatch}>Generate Match</Button>
        </div>
      </div>

      {/* Display Dogs */}
      {!matchedDog && (
        <div className="grid grid-cols-6 gap-6 mb-10">
          {dogs?.length === 0 ? (
            <p>No dogs found</p>
          ) : (
            dogs?.map((dog) => (
              <DogCard
                toggleFavorite={toggleFavorite}
                favoritedDogs={favoritedDogs}
                key={dog.id}
                {...dog}
              />
            ))
          )}
        </div>
      )}

      {/* Display Matched Dog */}
      {matchedDog && (
        <div>
          <h2 className="text-xl font-semibold mb-8 text-center">
            Congratulations! We've found your perfect furry friend!
          </h2>
          <div className="max-w-[300px] h-[400px]">
            <DogCard
              {...matchedDog}
              toggleFavorite={toggleFavorite}
              favoritedDogs={favoritedDogs}
              key={matchedDog?.id}
            />
          </div>
        </div>
      )}

      {/* Pagination */}
      {!matchedDog && (
        <PagePagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </section>
  );
}

export default Dashboard;
