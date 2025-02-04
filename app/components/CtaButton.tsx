"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const CtaButton = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Button asChild size="lg">
      <Link href={`${isAuthenticated ? "/dashboard" : "login"}`}>
        {isAuthenticated ? "Dashboard" : "Login"}
      </Link>
    </Button>
  );
};
export default CtaButton;
