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
    <nav className="py-6 bg-black text-gray-50 px-8 md:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-wider">PetFinder</h1>
        </Link>
        {isAuthenticated ? (
          <Button onClick={handleLogoutUser} size="lg" variant="secondary">
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button size="lg" variant="secondary">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
