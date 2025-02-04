export async function loginUser(name: string, email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    }
  );
  if (!response.ok) {
    throw new Error("Login failed. Please check your credentials");
  }
  return response;
}

export async function logoutUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong. Cannot logout at the moment");
  }

  return response;
}
