import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BreedSelectProps {
  breeds: string[];
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
}
const BreedSelect = ({
  breeds,
  selectedBreed,
  setSelectedBreed,
}: BreedSelectProps) => {
  return (
    <div>
      <Label>Select Breed:</Label>
      <Select
        onValueChange={(value) => setSelectedBreed(value)}
        value={selectedBreed}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Breeds" />
        </SelectTrigger>
        <SelectContent>
          {breeds.map((breed, index) => (
            <SelectItem key={index} value={breed}>
              {breed}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default BreedSelect;
