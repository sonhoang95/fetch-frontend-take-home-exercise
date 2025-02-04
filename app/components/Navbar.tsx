"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();

  const handleLogoutUser = async () => {
    await logout();
  };

  return (
    <nav className="py-6 bg-orange-500 text-gray-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-wider">PetFinder</h1>
        </Link>
        {isAuthenticated ? (
          <Button onClick={handleLogoutUser}>Logout</Button>
        ) : (
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
