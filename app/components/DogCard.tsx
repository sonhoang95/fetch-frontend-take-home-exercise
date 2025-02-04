import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Dog } from "../utils/types";

interface DogCardProps extends Dog {
  favoritedDogs: string[];
  toggleFavorite: (dogId: string) => void;
}
const DogCard = ({
  id,
  img,
  name,
  age,
  breed,
  zip_code,
  toggleFavorite,
  favoritedDogs,
}: DogCardProps) => {
  return (
    <Card key={id} className="relative h-[350px]">
      <div className="h-1/2">
        <Image
          src={img}
          alt={name}
          width={300}
          height={300}
          className="h-full rounded-t-lg"
        />
      </div>
      <CardContent className="py-4 h-1/2 space-y-2">
        <h2 className="text-lg font-semibold tracking-wide mb-2">{name}</h2>
        <p className="text-gray-600 text-sm">
          <strong>Breed:</strong> {breed}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Age: </strong>
          {age}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Location: </strong>
          {zip_code}
        </p>
        <Button
          onClick={() => toggleFavorite(id)}
          variant="outline"
          className="absolute top-2 right-2"
        >
          {favoritedDogs.includes(id) ? (
            <Heart color="red" fill="red" />
          ) : (
            <Heart />
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
export default DogCard;
