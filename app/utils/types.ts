export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code?: string;
  breed: string;
};

export type DogFilters = {
  breed: string;
  ageMin: string;
  ageMax: string;
  page: number;
  sort: string;
  zipCodes: string[];
};
