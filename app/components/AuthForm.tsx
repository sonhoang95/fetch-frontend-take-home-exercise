"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AuthForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await loginUser(name, email);
      router.push("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-4xl font-semibold">Login</h1>
        <p className="text-gray-500 font-light">
          Ready to adopt a furry friend? Login to begin...
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-8">
          <Label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 font-medium hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
