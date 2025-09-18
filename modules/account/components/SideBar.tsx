"use client";

import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoPersonOutline, IoHeartOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export const menuItems = [
  {
    label: "Profile",
    icon: IoPersonOutline,
    href: PAGE_PATHS.account.profile,
  },
  {
    label: "Orders",
    icon: MdOutlineShoppingBag,
    href: PAGE_PATHS.account.orders,
  },
  {
    label: "Products",
    icon: AiFillProduct,
    href: PAGE_PATHS.account.products,
  },
  {
    label: "Wishlist",
    icon: IoHeartOutline,
    href: PAGE_PATHS.account.wishlist,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full p-4 flex flex-col justify-between bg-accent dark:bg-card rounded-xl">
      <div>
        {/* User Info */}
        <div className="mb-6 text-center">
          <div className="size-20 rounded-full mx-auto bg-primary dark:bg-secondary" />
          <h2 className="mt-3 text-lg font-semibold">User Name</h2>
          <p className="text-sm text-gray-500">user@email.com</p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;

            return (
              <Button
                key={label}
                asChild
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                <Link href={href}>
                  <Icon className="mr-2" /> {label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <Button variant="outline" className="w-full mt-6 justify-center">
        <TbLogout className="mr-2" /> Logout
      </Button>
    </aside>
  );
}
