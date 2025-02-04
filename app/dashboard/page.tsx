"use client";

import { fetchBreeds, fetchDogs, fetchMatchedDog } from "@/app/utils/dogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BreedSelect from "../components/BreedSelect";
import BreedSortSelect from "../components/BreedSortSelect";
import DogCard from "../components/DogCard";
import { PagePagination } from "../components/PagePagination";
import { useAuth } from "../context/AuthContext";
import { Dog } from "../utils/types";

function Dashboard() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sortOrder, setSortOrder] = useState("breed:asc");
  const [favoritedDogs, setFavoritedDogs] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog>();
  const [totalPages, setTotalPages] = useState(0);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchBreeds().then(setBreeds);
  }, []);

  // Update query params on filter changes
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedBreed) queryParams.set("breed", selectedBreed);
    if (sortOrder) queryParams.set("sort", sortOrder);
    if (page) queryParams.set("page", page.toString());
    if (ageMin) queryParams.set("ageMin", ageMin);
    if (ageMax) queryParams.set("ageMax", ageMax);

    router.replace(`/dashboard?${queryParams.toString()}`);
  }, [selectedBreed, sortOrder, page, ageMin, ageMax, router]);

  const clearFilters = () => {
    setSelectedBreed("");
    setAgeMin("");
    setAgeMax("");
    setSortOrder("breed:asc");
    setPage(1);
    router.replace("/dashboard"); // Clear all query params
  };

  useEffect(() => {
    fetchDogs({
      breed: selectedBreed,
      page,
      sort: sortOrder,
      ageMin,
      ageMax,
    }).then((data) => {
      setDogs(data?.dogDetailsData);
      setTotalPages(data?.totalPages);
    });
  }, [selectedBreed, page, sortOrder, ageMin, ageMax]);

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
        setMatchedDog(match);
        router.push(`/dashboard/match?favorites=${match.id}`);
      } else {
        toast({ title: "No match found. Try again!" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error fetching match. Please try again later." });
    }
  };

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <section className="my-8 container mx-auto px-8 md:px-0">
      <h2 className="mb-2 text-lg font-medium tracking-wide">Filters</h2>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
            <BreedSelect
              breeds={breeds}
              selectedBreed={selectedBreed}
              setSelectedBreed={setSelectedBreed}
            />
            <Input
              placeholder="Min Age"
              className="md:max-w-[200px]"
              value={ageMin}
              onChange={(e) => setAgeMin(e.currentTarget.value)}
            />
            <Input
              placeholder="Max Age"
              className="md:max-w-[200px]"
              value={ageMax}
              onChange={(e) => setAgeMax(e.currentTarget.value)}
            />
            <Button variant="link" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-6 md:space-y-0">
          <BreedSortSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <Button
            className="w-full"
            onClick={handleMatch}
            disabled={favoritedDogs.length <= 0}
          >
            Generate Match
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 mb-10">
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

      {!matchedDog && (
        <PagePagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </section>
  );
}

export default Dashboard;
