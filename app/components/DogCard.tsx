import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dog } from "../utils/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

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
  toggleFavorite,
  favoritedDogs,
}: DogCardProps) => {
  return (
    <Card key={id} className="relative">
      <div className="h-1/2">
        <Image
          src={img}
          alt={name}
          width={300}
          height={300}
          className="h-full rounded-t-lg"
        />
      </div>
      <CardContent className="py-4 h-1/2">
        <h2 className="text-lg font-semibold tracking-wide mb-2">{name}</h2>
        <p className="text-gray-600 text-sm">
          <strong>Breed:</strong> {breed}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Age: </strong>
          {age}
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
