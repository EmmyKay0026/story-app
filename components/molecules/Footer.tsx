"use client";
// import { ALLCATEGORIES } from "@/types/stories";
import Link from "next/link";
import React, { useState } from "react";

const Footer = ({
  categories,
}: {
  categories: { label: string; value: string }[];
}) => {
  const [name, setName] = useState("");
  return (
    <footer className="dark:bg-gray-900 dark:text-gray-500 py-12 px-12  pb-0 w-full bg-[linear-gradient(90deg,_#ebffecab_0%,_rgba(255,255,255,1)_50%,_#ebffecab_100%)] dark:bg-[linear-gradient(90deg,_#2c312cab_0%,_#313131_50%,_#2c312cab_100%)]">
      <div className=" max-w-6xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div>
            <h4 className="text-[#45B649] text-lg font-semibold mb-4">Logo</h4>
            <p className="text-gray-500 mb-4">
              Discover stories that stay with you long after the last page.
            </p>
          </div>
          <div>
            <h4 className="text-[#45B649] text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-[#45B649] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className="text-gray-500 hover:text-[#45B649] transition-colors duration-300"
                >
                  Library
                </Link>
              </li>
              <li>
                <Link
                  href="/my-reads"
                  className="text-gray-500 hover:text-[#45B649] transition-colors duration-300"
                >
                  My Reads
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmark"
                  className="text-gray-500 hover:text-[#45B649] transition-colors duration-300"
                >
                  Bookmark
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#45B649] text-lg font-semibold mb-4">
              Genres
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/library?tag=${category.value}`}
                    className="text-gray-500 hover:text-[#45B649] transition-colors duration-300"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#45B649] w-auto text-lg font-semibold mb-4">
              Stay Updated
            </h4>
            <p className="text-gray-500 mb-4">
              Subscribe to our newsletter for new releases and exclusive
              content.
            </p>
            <div className="flex flex-col mt-4">
              <input
                type="email"
                placeholder="Your Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-shaft dark:text-white rounded-md border-none focus:outline-none focus:ring-2 focus:ring-[#45B649]"
              />
              <button className="bg-gradient-to-r from-[#45B649] to-[#38a03c] mt-4 text-white py-2 px-4 rounded-md font-semibold hover:from-[#3a9b3d] hover:to-[#2e8b31] transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center flex justify-between flex-wrap">
          <p className="text-gray-500 text-left text-[14px] md:text-[1rem]">
            &copy; 2025 StoryVerse. All rights reserved.
          </p>
          <p className="text-gray-500 text-[14px] md:text-[1rem]">
            Created by Amplity.
          </p>
        </div>
      </div>
      {/* <span className=""> */}

      <h2 className="text-transparent text-center text-[3rem] md:text-[8rem] font-semibold opacity-50 my-0 mt-8 bg-clip-text bg-gradient-to-r from-faded-primary to-primary dark:from-dark-primary dark:to-primary">
        Story App
      </h2>
    </footer>
  );
};

export default Footer;
