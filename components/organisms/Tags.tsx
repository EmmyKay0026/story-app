import React from 'react'
import Link from 'next/link'
import { ALLCATEGORIES } from "@/constants/stories";

const Tags = () => {
  return (
    <section className="pb-[7rem] pt-[3rem] px-[1rem] md:px-[3rem]">
      <div className="w-full flex flex-col text-center text-3xl items-center justify-center md:text-3xl font-bold text-black dark:text-white mb-[2rem]">
        <p className="mb-4">Popular Tags</p>
        <div className="h-1 w-20  mt-[-6] bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-wrap gap-4 md:gap-8">
          {ALLCATEGORIES.map((category, index) => (
            <Link
              key={index + category.value}
              href={`/library/?tag=${category.value}`}
              className="p-4 shadow-[-5px_20px_24px_-4px_#2b353914] rounded-[10px] text-primary hover:underline dark:border-[#d2d2d2e4] dark:border"
              // 0_8px_8px_-4px_#2b35390a,
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tags
