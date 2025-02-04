"use client";

import { fetchMatchedDog } from "@/app/utils/dogs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dog } from "@/app/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function MatchPage() {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const favoritedDogs = searchParams?.get("favorites")?.split(",") || [];

  useEffect(() => {
    if (favoritedDogs.length) {
      fetchMatchedDog(favoritedDogs).then((dog) => {
        setMatchedDog(dog);
      });
    } else {
      router.push("/dashboard"); // Redirect if no favorites
    }
  }, [favoritedDogs, router]);

  return (
    <section className="min-h-screen flex flex-col items-center mt-24">
      {matchedDog ? (
        <>
          <h2 className="text-xl font-semibold mb-8 text-center">
            Congratulations! We've found your perfect furry friend!
          </h2>
          <Card className="relative h-[350px]">
            <div className="h-1/2">
              <Image
                src={matchedDog.img}
                alt={matchedDog.name}
                width={300}
                height={300}
                className="h-full rounded-t-lg"
              />
            </div>
            <CardContent className="py-4 h-1/2 space-y-2">
              <h2 className="text-lg font-semibold tracking-wide mb-2">
                {matchedDog.name}
              </h2>
              <p className="text-gray-600 text-sm">
                <strong>Breed:</strong> {matchedDog.breed}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Age: </strong>
                {matchedDog.age}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Location: </strong>
                {matchedDog.zip_code}
              </p>
            </CardContent>
          </Card>
          <Button asChild size="lg" className="mt-8">
            <Link href="/dashboard">View All Dogs</Link>
          </Button>
        </>
      ) : (
        <p>Loading your match...</p>
      )}
    </section>
  );
}
