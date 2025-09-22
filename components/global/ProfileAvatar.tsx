"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { menuItems } from "@/modules/account/components/SideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ProfileAvatarProps {
  onSignOut?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ onSignOut }) => {

  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer hover:opacity-90 transition">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="border">S</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 z-[120]">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">Guest</span>
            <span className="text-xs text-muted-foreground">
              abc@gmail.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="my-2">
          {menuItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;

            return (
              <DropdownMenuItem
                key={label}
                asChild
                className={`w-full justify-start font-medium ${isActive ? 
                  "bg-primary !hover:bg-primary font-semibold" : ""
                  }`}
              >
                <Link href={href}>
                  <Icon className="mr-2" /> {label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
