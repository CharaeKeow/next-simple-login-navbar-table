"use client";

// import { useState } from "react";
import { Input } from "../input/input";

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
    <div className="flex justify-between py-4 px-8 border-b">
      <div className="flex gap-6 items-center justify-start">
        <a href="#" className="font-bold text-lg">
          NAVBAR_TITLE
        </a>
        <ul className="flex gap-6 items-center">
          {navbarLinks.map((item, index) => (
            <li className=" hover:text-red-500 transition-all" key={index}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <Input
        className="w-fit lg:w-[230px] bg-gray-50 justify-self-end"
        type="text"
        placeholder="Search documentation..."
      />
    </div>
  );
};
