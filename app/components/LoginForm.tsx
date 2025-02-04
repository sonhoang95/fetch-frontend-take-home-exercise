"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await login(name, email);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <div className=" space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Login</h1>
        {!isAuthenticated && (
          <p className="text-gray-500 md:text-lg font-light">
            Ready to adopt a furry friend? Login to begin...
          </p>
        )}
        {error && <p className="text-red-500 mb-2">{error}</p>}
      </div>
      {!isAuthenticated && (
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
          <div className="mb-10">
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
            className="w-full font-medium  text-white py-2 rounded"
          >
            Login
          </Button>
        </form>
      )}
    </div>
  );
}
