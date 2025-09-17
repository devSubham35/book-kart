"use client";

import { Button } from "@/components/ui/button";
import { IoPersonOutline, IoHeartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

export default function Sidebar() {
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

          <Button className="w-full justify-start">
            <IoPersonOutline className="mr-2" /> My Profile
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <MdOutlineShoppingBag className="mr-2" /> My Orders
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <IoHeartOutline className="mr-2" /> Wishlist
          </Button>
        </nav>
      </div>

      {/* Logout */}
      <Button variant="outline" className="w-full mt-6 justify-center">
        <TbLogout className="mr-2" /> Logout
      </Button>
    </aside>
  );
}
