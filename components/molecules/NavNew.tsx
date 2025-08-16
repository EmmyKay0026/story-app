"use client";
import React, { useEffect, useState } from "react";
import Brand from "../Atoms/Brand";
import NavLists from "../Molecules/NavLists";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../Atoms/Button";
import Link from "next/link";
import CustomLink from "../Atoms/CustomLink";

const NavNew = () => {
  const [showNav, setShowNav] = useState<boolean>(true);

  return (
    <nav className="flex flex-col md:flex-row amd:h-[70px] md:items-center sticky  w-full md:justify-between xbgd-white/30 bg-[#ffffffb0] xbg-[#ffffffe6] shadow-nav-shadow px-0 md:px-[25px]  md:py-2 lg:px-[80px]  backdrop-blur-md z-[9999] top-0">
      <div className="flex  md:flex-row items-center justify-between px-3 pl-[30px] md:px-0 md:items-center w-full md:w-fit h-[10dvh] md:h-fit ">
        <Brand />
        {showNav ? (
          <FaBars
            className="md:hidden flex w-[24px] h-[24px]"
            onClick={() => setShowNav(!showNav)}
          />
        ) : (
          <FaTimes
            className="md:hidden flex w-[24px] h-[24px]"
            onClick={() => setShowNav(!showNav)}
          />
        )}
      </div>
      {/* desktop and tablet*/}
      <div className=" hidden md:flex justify-between items-center">
        <div
          className={`flex flex-col justify-between md:flex px-8 md:px-0 bg-[rgba(0,0,0,0.6)] md:bg-transparent h-[90dvh] md:h-auto ${
            showNav ? "hidden" : "flex"
          } sm:hidden md:mr-[4rem]`}
        >
          <NavLists />
        </div>
        <CustomLink href={"/apply"}>
          <Button className="hidden text-white lg:block lg:px-[30px] py-4">
            Apply Now
          </Button>
        </CustomLink>
      </div>
      {/* Mobile */}
      <div className="flex justify-between items-center  relative backdrop-blur-lg md:hidden">
        <div
          className={`flex flex-col justify-between relative top-0 min-h-[100vh] md:flex px-8 md:px-0 w-full bg-transparent  jkbg-[#ffffffb0] abg-[#00000099] backdrop-blur-lg abg-[#ffffffe6] abg-[rgba(0,0,0,0.6)] md:bg-transparent jh-[auto] kmd:h-auto ${
            showNav ? "hidden" : "block"
          } sm:hidden md:mr-[4rem]`}
        >
          <NavLists />
          <p className="mb-3 mt-6  md:hidden">
            copyright &copy; {new Date().getFullYear()} Dyen
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavNew;
