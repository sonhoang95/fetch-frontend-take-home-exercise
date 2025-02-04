"use client";

import Image from "next/image";
import dogPortrait from "@/public/images/dog-portrait.jpg";
import CtaButton from "./components/CtaButton";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    router.push("/login");
  }
  return (
    <section className="relative w-full h-[800px] md:h-screen">
      {/* Responsive image */}
      <Image
        src={dogPortrait}
        alt="Dog Portrait"
        layout="fill"
        objectFit="cover"
        objectPosition="right"
        priority
        className="-z-10"
      />

      <div className="absolute top-0 left-0 right-0 w-full h-full bg-black/40 flex md:items-center px-4 md:px-24">
        <div className="max-w-xl p-6 rounded-2xl text-white text-center mt-24 md:mt-0 md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to PetFinder!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Start searching for your furry friend today! Woof!
          </p>
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
