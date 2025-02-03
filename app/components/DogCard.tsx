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

const DogCard = ({ id, img, name, age, breed }: Dog) => {
  return (
    <Card key={id} className="max-h-[300px]">
      <div className="h-1/2">
        <Image
          src={img}
          alt={name}
          width={300}
          height={300}
          className="h-full rounded-t-lg"
        />
      </div>
      <CardContent className="py-4">
        <h2 className="text-lg font-semibold tracking-wide">{name}</h2>
        <p>Breed: {breed}</p>
        <p>Age: {age}</p>
        {/* <button onClick={() => toggleFavorite(dog.id)}>
                {favoritedDogs.includes(dog.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button> */}
      </CardContent>
    </Card>
  );
};
export default DogCard;
