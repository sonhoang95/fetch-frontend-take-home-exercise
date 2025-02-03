const BASE_URL = "https://frontend-take-home-service.fetch.com";

export async function loginUser(name: string, email: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) {
    throw new Error("Login failed. Please check your credentials");
  }
  return response;
}

export async function fetchBreeds() {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    {
      method: "GET",
      credentials: "include", // Include the auth cookie
    }
  );

  if (response.ok) {
    const breeds = await response.json();
    return breeds;
  } else {
    throw new Error("Failed to fetch breeds");
  }
}

export async function fetchDogs({
  breed,
  ageMin,
  ageMax,
  page = 1,
  sort = "breed:asc",
}) {
  const size = 25; // Number of dogs per page
  const from = (page - 1) * size;

  const queryParams = new URLSearchParams({
    breeds: breed || [],
    ageMin: ageMin || "",
    ageMax: ageMax || "",
    size: size.toString(),
    from: from.toString(),
    sort: sort || "breed:asc",
  });

  const response = await fetch(
    `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include", // Include the auth cookie
    }
  );

  if (response.ok) {
    const data = await response.json();
    const resultIds = data.resultIds;

    if (resultIds.length > 0) {
      // Fetch full dog data using the resultIds
      const dogDetailsResponse = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultIds), // Sending the array of resultIds in the body
          credentials: "include", // Include the auth cookie
        }
      );
      if (dogDetailsResponse.ok) {
        const dogDetailsData = await dogDetailsResponse.json();
        return dogDetailsData;
      } else {
        console.error("Failed to fetch dog details");
      }
    }
  } else {
    console.error("Failed to fetch dogs");
  }
}

// export async function fetchDogMatch(favoritedDogIds) {
//   const response = await fetch(
//     "https://frontend-take-home-service.fetch.com/dogs/match",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(favoritedDogIds),
//       credentials: "include", // Include the auth cookie
//     }
//   );

//   if (response.ok) {
//     const match = await response.json();
//     return match;
//   } else {
//     throw new Error("Failed to fetch match");
//   }
// }
