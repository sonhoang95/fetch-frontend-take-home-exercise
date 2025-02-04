export async function fetchBreeds() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/dogs/breeds`,
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
  breed = "",
  ageMin = "0",
  ageMax = "100",
  page = 1,
  sort = "breed:asc",
}) {
  const size = 24;
  const from = (page - 1) * size;

  const queryParams = new URLSearchParams({
    ageMin: ageMin || "0",
    ageMax: ageMax || "100",
    size: size.toString(),
    from: from.toString(),
    sort: sort || "breed:asc",
  });

  if (breed) {
    queryParams.set("breeds", breed);
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/dogs/search?${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (response.ok) {
    const data = await response.json();
    const resultIds = data.resultIds;
    const totalPages = data.total;

    if (resultIds.length > 0) {
      // Fetch full dog data using the resultIds
      const dogDetailsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dogs`,
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
        return { dogDetailsData, totalPages };
      } else {
        console.error("Failed to fetch dog details");
      }
    }
  } else {
    console.error("Failed to fetch dogs");
  }
}

export async function fetchMatchedDog(favoritedDogIds: string[]) {
  try {
    // Step 1: Fetch the match from the API
    const matchResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dogs/match`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoritedDogIds),
        credentials: "include",
      }
    );

    if (!matchResponse.ok) {
      throw new Error("Failed to fetch dog match");
    }

    const matchData = await matchResponse.json();

    // Extract the matched dog ID from the 'match' property
    const matchedDogId = matchData.match;

    if (!matchedDogId) {
      throw new Error("No matched dog found");
    }

    // Step 2: Fetch the specific dog details based on the matched dog ID
    const dogDetailsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([matchedDogId]), // API expects an array of IDs
        credentials: "include",
      }
    );

    if (!dogDetailsResponse.ok) {
      throw new Error("Failed to fetch matched dog details");
    }

    const dogDetails = await dogDetailsResponse.json();
    return dogDetails[0]; // Return the specific dog object
  } catch (error) {
    console.error(error);
    return null;
  }
}
