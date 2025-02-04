"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { logoutUser } from "../utils/auth";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogoutUser = async () => {
    try {
      await logoutUser();
      toast({ title: "Successfully logged out" });
      router.push("/"); // Redirect to clear UI
    } catch (error) {
      toast({ variant: "destructive", title: "Logout failed" });
    }
  };

  return (
    <nav className="py-6 bg-orange-500 text-gray-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-wider">PetFinder</h1>
        </Link>
        {isLoggedIn ? (
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
