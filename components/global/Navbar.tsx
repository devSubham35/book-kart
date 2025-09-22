import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/routes/pagePaths";
import SellBookUI from "@/modules/sell-book/pages/SellBookUI";
import SearchInput from "./SearchInput";

const Navbar = () => {


  return (
    <>
      <nav className="h-16 bg-background border-b sticky top-0 left-0 z-[60]">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-semibold whitespace-nowrap">
              Book <span className="text-primary">Kart</span>
            </Link>
            <SearchInput />
          </div>


          <div className="flex items-center gap-3">
            <ProfileAvatar onSignOut={() => { }} />

            <SellBookUI />
            <Link href={PAGE_PATHS.register}>
              <Button variant="outline" className="hidden sm:inline-flex">
                Register
              </Button>
            </Link>
            <Link href={PAGE_PATHS.login}>
              <Button className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <ThemeToggler />
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;