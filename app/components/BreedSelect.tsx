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
      <Select
        onValueChange={(value) => setSelectedBreed(value)}
        value={selectedBreed}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Breed" />
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
