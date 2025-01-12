'use client';

import { useState } from 'react';
import { LucideMenu, LucideSearch, LucideX } from 'lucide-react';

import { cn } from '@/utils/cn';

import { Input } from '../input/input';
import { Button, buttonVariants } from '../button/button';
import Link from 'next/link';
import { useAuth } from '@/features/auth/contexts/auth-provider';
import { logout } from '@/action/logout';

type NavbarLinks = {
  title: string;
  href: string;
};

const navbarLinks: NavbarLinks[] = [
  {
    title: 'Showcase',
    href: '#',
  },
  {
    title: 'Docs',
    href: '#',
  },
  {
    title: 'Blog',
    href: '#',
  },
  {
    title: 'Analytics',
    href: '#',
  },
  {
    title: 'Templates',
    href: '#',
  },
  {
    title: 'Enterprise',
    href: '#',
  },
];

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex gap-x-6 flex-col lg:flex-row justify-between items-center lg:py-4 lg:px-8 border-b">
      <div
        className={cn(
          'w-full flex justify-between lg:w-fit px-6 py-4 lg:p-0 font-bold text-lg lg:border-0',
          isOpen && 'border-b'
        )}
      >
        <Link href="/">NAVBAR_TITLE</Link>
        <div
          className={cn(
            'lg:hidden flex items-center gap-x-2',
            isOpen ? 'flex' : 'hidden'
          )}
        >
          <LucideSearch />
          <LucideX size={28} onClick={toggleMenu} />
        </div>

        {/* Hamburger menu */}
        {/* TODO: Accessibility? Maybe should wrap this inside button? */}
        <LucideMenu
          className={cn('lg:hidden', isOpen ? 'hidden' : 'flex')}
          onClick={toggleMenu}
        />
      </div>

      <ul
        className={cn(
          'lg:flex flex-col lg:flex-row gap-6 items-start py-4 lg:items-center w-full px-6 lg:p-0',
          isOpen ? 'flex' : 'hidden'
        )}
      >
        {navbarLinks.map((item, index) => (
          <li className=" hover:text-primary  transition-all" key={index}>
            <Link onClick={() => setIsOpen(false)} href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <Input
        className="w-fit lg:w-[230px] bg-gray-50 hidden lg:block"
        type="text"
        placeholder="Search documentation..."
      />

      <div
        className={cn(
          'px-6 pb-6 self-start lg:self-center lg:p-0 hidden lg:block',
          isOpen && 'block'
        )}
      >
        {/* Note: Using buttonVariants helper to create link that looks like Button. Think the `asChild` props way using Slot looks much cleaner and easier. */}
        {/* TODO: Shall revisit this later */}
        {!isAuthenticated ? (
          <Link
            className={buttonVariants()}
            href="/login"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        ) : (
          <Button
            onClick={async () => {
              await logout();

              // Reload the page upon logout to clear the states. In real world this implementation would depends on the auth library/method used
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};
