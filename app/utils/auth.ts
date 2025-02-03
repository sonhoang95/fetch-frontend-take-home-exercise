export async function loginUser(name: string, email: string) {
  console.log(process.env.API_BASE_URL);
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
