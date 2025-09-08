"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import { ThemeToggle } from "../atoms/ThemeToggle";
import Link from "next/link";
import { BookCopy, Bookmark, BookOpen, Home, Menu, X } from "lucide-react";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/library", label: "Library", icon: BookCopy },
    { href: "/bookmark", label: "Bookmark", icon: Bookmark },
    { href: "/my-reads", label: "My Reads", icon: BookOpen },
  ];

  return (
    <>
      <div className="flex w-[100%] justify-between z-[20] text-black dark:text-white py-[10px] dark:bg-black bg-white top-0 px-[20px] md:px-[55px] items-center sticky shadow-[0px_0px_6px_8px_rgba(219,218,218,0.123)]  dark:shadow-[0px_0px_6px_8px_rgba(65,55,55,0.16)] bg-[linear-gradient(90deg,_#ebffecab_0%,_rgba(255,255,255,1)_50%,_#ebffecab_100%)] dark:bg-[linear-gradient(90deg,_#2c312cab_0%,_#313131_50%,_#2c312cab_100%)] ">
        <div>LOGO</div>

        <ul className="hidden md:flex gap-[10px] child: items-center">
          <Link href={"/"}>
            <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
              Home
            </li>
          </Link>
          <Link href={"/library"}>
            <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
              Library
            </li>
          </Link>
          <Link href={"/my-reads"}>
            <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
              My Reads
            </li>
          </Link>
          <Link href={"/bookmark"}>
            <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
              Bookmark
            </li>
          </Link>
        </ul>
        <div className="hidden md:flex gap-[10px]">
          <ThemeToggle />
          <Link href={"/auth/login"}>
            <Button
              // onClick={openModal}
              label="Login"
              className=" py-[4px] px-[15px]"
            />
          </Link>
        </div>
        <div
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          className="md:hidden"
        >
          {openMenu ? <X /> : <Menu />}
        </div>
      </div>

      {/* Mobile menu */}
      {openMenu && (
        <article className="relative h-screen block md:hidden">
          <ul className="fixed z-10 w-screen h-screen  glass  gap-[10px] child: items-center">
            {navigationItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpenMenu(false)}
                className={`
                    flex items-center px-5 py-5 not-[]:text-sm font-medium transition-colors p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer duration-200
                    `}
                // {
                //   isActive(href)
                //     ? "bg-blue-100 dark:bg-blue-300 rounded-[50%] backdrop-blur-[40px] text-primary dark:text-gray-900"
                //     : "text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                // }
              >
                <Icon className="w-5 h-5 text-primary" />
                <p className="ml-2">{label}</p>
              </Link>
            ))}
            <div className="px-5 ">
              <div className="my-2">
                <ThemeToggle />
              </div>
              <Link className=" py-5" href={"/auth/login"}>
                <Button
                  // onClick={openModal}
                  label="Login"
                  className=" py-[4px] px-[15px]"
                />
              </Link>
            </div>
          </ul>
          <h2 className=" fixed z-20 w-full bottom-0 text-transparent text-center text-[3rem] md:text-[5rem] font-bold opacity-50 my-0 mt-8 bg-clip-text bg-gradient-to-r from-faded-primary to-primary dark:from-dark-primary dark:to-primary">
            Story App
          </h2>
        </article>
      )}
    </>
  );
};

export default NavBar;
