"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import { ThemeToggle } from "../atoms/ThemeToggle";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLoginSuccess = () => {
    alert("Succesful!");
    closeModal;
  };

  return (
    <div className="flex w-[100%] justify-between z-[20] text-black dark:text-white py-[10px] dark:bg-black bg-white top-0 px-[55px] items-center sticky">
      <div>LOGO</div>
      <ul className="flex gap-[10px] child: items-center">
        <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
          Home
        </li>
        <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
          My Reads
        </li>
        <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
          Favourites
        </li>
        <li className="p-2 hover:bg-[rgba(69,182,73,0.2)] rounded-[12px] hover:text-[#FFFFE0] cursor-pointer transition-all duration-200">
          Categories
        </li>
      </ul>
      <div className="flex gap-[10px]">
        <ThemeToggle />
        <Button
          onClick={openModal}
          label="Login"
          className=" py-[4px] px-[10px]"
        />
      </div>
    </div>
  );
};

export default NavBar;
