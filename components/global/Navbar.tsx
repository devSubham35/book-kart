"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { PAGE_PATHS } from "@/routes/pagePaths";
import ProfileAvatar from "./ProfileAvatar";
import SellBookUI from "@/modules/sell-book/pages/SellBookUI";
import SearchInput from "./SearchInput";
import { ThemeToggler } from "./ThemeToggler";
import { usePathname } from "next/navigation";
import CartIcon from "./CartIcon";

const Navbar = () => {

  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isAuthPage = pathname === PAGE_PATHS.login || pathname === PAGE_PATHS.register

  return (
    <>
      {/* Top Navbar */}
      <nav className="h-16 bg-background border-b sticky top-0 left-0 z-[20]">
        <div className="container h-full flex items-center justify-between p-4 2xl:p-0">

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-lg md:text-2xl font-semibold whitespace-nowrap"
            >
              Book <span className="text-primary">Kart</span>
            </Link>

            {/* Search input (desktop only) */}
            <div className="hidden lg:block">
              <SearchInput />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Show hamburger menu if not logged in (mobile only) */}
            {!isLoggedIn && (
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="left">
                    <div className="flex flex-col gap-3 mt-6 p-4">
                      <div className="flex justify-between my-2">
                        <div>
                          <h1 className="text-base">Welcome to BookKart</h1>
                          <p className="text-muted-foreground text-xs">
                            Buy, sell, and discover books effortlessly.
                          </p>
                        </div>
                        <ThemeToggler />
                      </div>

                      <SellBookUI />

                      <Link href={PAGE_PATHS.register}>
                        <Button variant="outline" className="w-full">
                          Register
                        </Button>
                      </Link>

                      <Link href={PAGE_PATHS.login}>
                        <Button className="w-full">Login</Button>
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}

            <CartIcon />

            {/* Show profile avatar if logged in */}
            {isLoggedIn && (
              <ProfileAvatar onSignOut={() => setIsLoggedIn(false)} />
            )}

            {/* Desktop actions (sm and up) */}
            <div className="hidden lg:flex items-center gap-3">
              <SellBookUI />

              {!isLoggedIn && (
                <>
                  <Link href={PAGE_PATHS.register}>
                    <Button variant="outline">Register</Button>
                  </Link>
                  <Link href={PAGE_PATHS.login}>
                    <Button>Login</Button>
                  </Link>
                </>
              )}

              <ThemeToggler />
            </div>
          </div>
        </div>
      </nav>

      {/* Search bar below nav on mobile */}
      {!isAuthPage && <div className="block lg:hidden px-4 mt-4 pb-4">
        <SearchInput />
      </div>
      }
    </>
  );
};

export default Navbar;
