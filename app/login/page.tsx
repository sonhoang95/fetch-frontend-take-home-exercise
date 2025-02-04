import Image from "next/image";
import pugPortrait from "@/public/images/pug-portrait.jpg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-24 items-center justify-center min-h-screen container mx-auto">
      {/* Image Container */}
      <div className="md:flex-1">
        <Image
          src={pugPortrait}
          alt="pug-portrait"
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
