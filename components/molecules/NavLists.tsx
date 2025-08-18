import React from "react";
import { ListData } from "@/constants/constant";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CustomLink from "../atoms/CustomLink";

export default function NavLists() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col md:flex-row">
      {ListData.map((item) => (
        <li
          key={item.id}
          className={`${item.id === "6" ? "" : "mb-[1.8rem] md:mr-6 md:mb-0"} ${
            item.id === "1" ? "mt-[2rem] md:mt-0" : " "
          } ${
            pathname === item.link ? "underline_nav" : ""
          } hover:underline_nav::before capitalize`}
        >
          <CustomLink
            className={` text-black dark:text-[#FFFFFF] text-lg whitespace-nowrap md:text-base  flex ${
              item.active === true ? "" : "cursor-default text-gray-400"
            }`}
            href={item.active === true ? item.link : ""}
          >
            <span className={`md:hidden mr-[.7rem] `}>
              <Image src={item.imgUrl} width={40} height={40} alt={item.name} />
            </span>
            {item.name}
          </CustomLink>
        </li>
      ))}
    </ul>
  );
}
