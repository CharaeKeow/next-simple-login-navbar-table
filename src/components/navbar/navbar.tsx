"use client";

// import { useState } from "react";
import { Input } from "../input/input";

import { LucideSearch, LucideX } from "lucide-react";

type NavbarLinks = {
  title: string;
  href: string;
};

const navbarLinks: NavbarLinks[] = [
  {
    title: "Showcase",
    href: "#",
  },
  {
    title: "Docs",
    href: "#",
  },
  {
    title: "Blog",
    href: "#",
  },
  {
    title: "Analytics",
    href: "#",
  },
  {
    title: "Templates",
    href: "#",
  },
  {
    title: "Enterprise",
    href: "#",
  },
];

export const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:py-4 lg:px-8 border-b">
      <div className="flex flex-col w-full lg:flex-row gap-x-6 items-center justify-start">
        <div className="w-full flex justify-between lg:w-fit px-6 py-4 lg:p-0 font-bold text-lg border-b lg:border-0">
          <a href="#">NAVBAR_TITLE</a>
          <div className="lg:hidden flex items-center gap-x-2">
            <LucideSearch />
            <LucideX size={28} />
          </div>
        </div>

        <ul className="flex flex-col lg:flex-row gap-6 items-start py-4 lg:items-center w-full px-6 lg:p-0">
          {navbarLinks.map((item, index) => (
            <li className=" hover:text-red-500 transition-all" key={index}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <Input
        className="w-fit lg:w-[230px] bg-gray-50 hidden lg:block"
        type="text"
        placeholder="Search documentation..."
      />
    </div>
  );
};
