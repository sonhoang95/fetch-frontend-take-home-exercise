import Image from "next/image";
import dogPortrait from "@/public/images/dog-portrait.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative w-full h-screen">
      <Image
        src={dogPortrait}
        alt="Dog Portrait"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="-z-10"
      />

      <div className="absolute top-0 left-0 right-0 w-full h-full bg-black/20 flex items-center">
        <div className="max-w-2xl py-6 pl-24 text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to PetFinder!</h1>
          <p className="text-xl mb-6">
            Start searching for your furry friend today! Woof!
          </p>
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
