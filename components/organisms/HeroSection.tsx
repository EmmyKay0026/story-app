import React from "react";
import Link from "next/link";
import Button from "../atoms/Button";
import Cards from "../molecules/card";

const HeroSection = () => {
  return (
    <div className="z-0 relative">
      <section className="relative h-full w-full overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#45B649]/30 rounded-full bubble-3d blur-xl shadow-2xl z-0"></div>
        <div
          className="absolute bottom-20 left-30 w-28 h-28 bg-[#3aa13e]/30 rounded-full bubble-3d blur-2xl shadow-xl z-0"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-[40%] right-[60%] w-16 h-16 bg-[#085f33]/30 rounded-full bubble-3d blur-md shadow-xl z-0"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-10 pt-[20%] max-w-[100dvw] px-[1rem] md:px-[3rem] flex flex-col items-center md:pt-0 md:top-0 h-[100dvh] lg:flex-row lg:justify-between pb-[2rem] ">
          <div className="flex flex-col basis-[50%] px-[1rem] lg:px-0 max-w-2xl text-center lg:text-left items-center lg:items-start justify-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Step Into a World of
              <span className="text-transparent bg-clip-text w-[150px] bg-[#45B649]">
                {" "}
                Stories
              </span>
            </h2>
            <p className="text-sm md:text-xl text-black-900 dark:text-gray-300 mx-auto">
              From thrilling adventures to heartwarming tales. Discover stories
              that inspire, entertain, and transport you to incredible new
              worlds. Start your reading journey today.
            </p>
            <Link href={"/library"}>
              <Button
                // onClick={openModal}
                label="Start Reading"
                className="py-[5px] w-[150px] mt-[2rem] px-[10px]"
              />
            </Link>
            {/* {isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                  <LoginPage onSuccess={handleLoginSuccess} onClose={closeModal} />
                </div>
              </div>
            )} */}
          </div>
          <Cards />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
