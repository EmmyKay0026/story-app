'use client'
import React, { useEffect, useState } from "react";
import Button from '../atoms/Button'
import { ThemeToggle } from '../atoms/ThemeToggle'
import { FaBars, FaTimes } from "react-icons/fa";
import NavLists from "../molecules/NavLists";
// import { LoginModal } from "./LoginModal"
// import Link from "next/link";
// import CustomLink from "../atoms/CustomLink";



const NavBar = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [showNav, setShowNav] = useState<boolean>(true);

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleLoginSuccess = () => {
    alert('Succesful!')
    closeModal
  }

  return (
    <div className="flex flex-col md:flex-row w-[100%] md:justify-between z-[2000] text-black dark:text-white py-[5px] md:py-[20px] dark:bg-black bg-white top-0 px-[25px] md:px-[55px] sticky">
      <div className="flex  md:flex-row items-center justify-between md:items-center w-full md:w-fit h-[10dvh] md:h-fit ">
        <div>LOGO</div>
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
      <div
        className={`flex flex-col md:flex px-8 md:px-0 md:bg-transparent h-[90dvh] md:h-auto ${
          showNav ? "hidden" : "flex"
        } sm:hidden md:mr-[4rem]`}
      >
        <NavLists />
        <div className='flex flex-col md:hidden gap-[10px]'> 
          <ThemeToggle />
          <Button onClick={openModal} label='Login'className='top-0 py-[4px] w-[100px] px-[10px]'/>
        </div>

      </div>
      
      
        
      <div className='hidden md:flex gap-[10px]'> 
        <ThemeToggle />
        <Button onClick={openModal} label='Login'className=' py-[4px] px-[10px]'/>
      </div>
     
      
      
    </div>
  )
}

export default NavBar
