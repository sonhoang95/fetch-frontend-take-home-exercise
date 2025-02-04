import Navbar from "./Navbar";
import { cookies } from "next/headers";

const NavbarWrapper = async () => {
  const cookieStore = await cookies();
  const hasAuthCookie = !!cookieStore.get("fetch-access-token");
  console.log(hasAuthCookie);
  return <Navbar isLoggedIn={hasAuthCookie} />;
};

export default NavbarWrapper;
