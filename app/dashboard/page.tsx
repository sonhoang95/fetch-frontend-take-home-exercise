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
import { Input } from "@/components/ui/input";
import Link from "next/link";

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

  const handleMatch = async () => {
    try {
      const match = await fetchMatchedDog(favoritedDogs);
      if (match) {
        router.push(`/dashboard/match?favorites=${match.id}`);
      } else {
        toast({ title: "No match found. Try again!" });
      }
    } catch (error) {
      toast({ title: "Error fetching match. Please try again later." });
    }
  };

  if (!isAuthenticated) {
    router.push("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <section className="my-8 container mx-auto">
      <h2 className="mb-2 text-lg font-medium tracking-wide">Filters</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-6">
            <BreedSelect
              breeds={breeds}
              selectedBreed={selectedBreed}
              setSelectedBreed={setSelectedBreed}
            />
            <Input placeholder="Age" className="max-w-[200px]" />
            <Input placeholder="Location (Zipcode)" className="max-w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-6">
          <BreedSortSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
          {/* Match Button */}
          <Button onClick={handleMatch} disabled={favoritedDogs.length <= 0}>
            Generate Match
          </Button>
        </div>
      </div>

      {/* Display Dogs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6 mb-10">
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

      {/* Pagination */}
      {!matchedDog && (
        <PagePagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </section>
  );
}

export default Dashboard;
