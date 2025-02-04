import Image from "next/image";
import CartoonDogImg from "@/public/images/cartoon-dog.jpg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <section className="flex gap-24 items-center justify-center min-h-screen container mx-auto">
      {/* Image Container */}
      <div className="flex-1">
        <Image
          src={CartoonDogImg}
          alt="Cartoon dog"
          className="object-cover rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Form Container */}
      <div className="flex-1">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
