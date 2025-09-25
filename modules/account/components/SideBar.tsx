"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineHeart, HiUser } from "react-icons/hi";

export const menuItems = [
  { label: "Profile", icon: HiUser, href: PAGE_PATHS.account.profile },
  { label: "Orders", icon: MdOutlineShoppingBag, href: PAGE_PATHS.account.orders },
  { label: "Products", icon: AiFillProduct, href: PAGE_PATHS.account.products },
  { label: "Wishlist", icon: HiOutlineHeart, href: PAGE_PATHS.account.wishlist },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-muted border dark:bg-card rounded-xl p-4 flex flex-col lg:h-full">
      {/* User Info */}
      <div className="w-full mb-4 text-center flex lg:flex-col gap-2 lg:justify-center items-center">
        <div className="size-16 lg:size-20 rounded-full bg-primary dark:bg-secondary" />
        <div className="lg:text-center">
          <h2 className="lg:mt-3 text-lg font-semibold">User Name</h2>
          <p className="text-sm text-gray-500">user@email.com</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex lg:flex-col justify-around lg:justify-start gap-2 w-full">
        {menuItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={`
          flex flex-col lg:flex-row items-center lg:items-start gap-1
          p-2 rounded-md
          justify-center lg:justify-start
          w-full lg:w-auto
          transition-colors duration-200
          ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
        `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm lg:text-base">{label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
