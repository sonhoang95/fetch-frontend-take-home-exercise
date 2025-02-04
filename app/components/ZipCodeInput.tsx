import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ZipCodeInput {
  zipCodes: string[];
  setZipCodes: (zipCode: string[]) => void;
}

function ZipCodeInput({ zipCodes, setZipCodes }: ZipCodeInput) {
  const [newZipCode, setNewZipCode] = useState("");

  const addZipCode = () => {
    if (newZipCode && !zipCodes.includes(newZipCode)) {
      setZipCodes([...zipCodes, newZipCode]);
      setNewZipCode("");
    }
  };

  const removeZipCode = (zip: string) => {
    setZipCodes(zipCodes.filter((z: string) => z !== zip));
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Input
          value={newZipCode}
          onChange={(e) => setNewZipCode(e.target.value)}
          placeholder="Enter zip code"
          className="md:w-[200px]"
        />
        <Button onClick={addZipCode}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 absolute top-12 z-10">
        {zipCodes.map((zip: string) => (
          <Badge key={zip} className="px-3 py-1 flex items-center gap-2">
            {zip}
            <button onClick={() => removeZipCode(zip)}>✕</button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default ZipCodeInput;
