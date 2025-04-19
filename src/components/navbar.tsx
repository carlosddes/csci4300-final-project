'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { doLogout } from "@/app/actions";

const navigation = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Incomes', href: '#', current: false },
  { name: 'Expenses', href: '#', current: false },
  { name: 'Savings', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {

  const [isLoggedIn,setIsLoggedIn ] = useState(!!session?.user);

  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  const handleLogout = async () => {
    doLogout();
    setIsLoggedIn(false);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Main Components */}
          <div className="relative flex h-16 items-center justify-between w-full">
            {/* Logo */}
            <div className="flex shrink-0 items-center space-x-5 sm:space-x-2">
              <div className="pl-6 sm:pl-0">
                <Image 
                  height={60}
                  width={60}
                  src="/FLogo.png" 
                  alt="Website Logo">
                </Image>
              </div>
              {/* Heading Title */}
              <div className="hidden lg:flex shrink-0 items-center text-black font-medium font-sans">
                <h1>Personal Finance Tracker</h1>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              {/* Buttons */}
              <div className="flex space-x-4">
                {isLoggedIn && navigation.map((item) => (
                  <Link
                  key={item.name}
                  href='/overview'
                  className={classNames(
                    item.current ? 'bg-[#F5F8FF] text-[#155EEF]' : 'text-[#516778] hover:bg-[#F5F8FF] hover:text-[#155EEF]',
                    'rounded-md px-3 py-2 text-sm font-medium font-sans',
                  )}
                >
                  {item.name}
                </Link>
                ))}
              </div>
            </div>

            {/* <!-- Login Register Buttons (Logged Out) --> */}
            { 
              !isLoggedIn && (
                    <div className='block md:ml-6'>
                      <div className='flex items-center'>
                        <Link href="/login" className='flex items-center text-white bg-[#155EEF] hover:bg-[#0F4ACC] hover:text-white rounded-md px-3 py-2 font-small font-sans'>
                          <span>Login | Register</span>
                        </Link>
                      </div>
                    </div>
              )
            }

            {/* <!-- Profile dropdown (Logged In) --> */}
            { isLoggedIn && (
              <div className="absolute right-0 flex items-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="Profile Photo"
                      src="/UserPfp.png"
                      className="size-10 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a onClick = {e => { e.preventDefault(); handleLogout();}}
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
