"use client";

import React, { useEffect, useState } from "react";
import LoginPage from "./auth/login/page";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { mockStories, stories } from "@/constants/stories";
import { StoryCard } from "@//components/molecules/StoryCards";
import { StoryCard as StoryCardV2 } from "@/components/molecules/StoryCard";
import { FontSizeControl } from "@/components/atoms/FontSizePreference";
import Button from "@/components/atoms/Button";
import Cards from "@/components/molecules/card";
import Link from "next/link";
import DetailsCard from "@/components/molecules/DetailsCard"
import NavBar from "@/components/molecules/NavBar";
import Footer from "@/components/molecules/Footer";
// import MobileStoryCard from '@/components/molecules/HomeCard'

export default function Home() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleLoginSuccess = () => {
    alert("Successful!");
    closeModal();
  };


  const handleReadStory = (storyId: number) => {
    console.log(`Reading story ${storyId}`);
  };

  return (
    <main className=" bg-white dark:bg-[#000000]">
      <NavBar />

      <div className="min-h-screen relative theme-transition ">
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
                  From thrilling adventures to heartwarming tales. Discover
                  stories that inspire, entertain, and transport you to incredible
                  new worlds. Start your reading journey today.
                </p>
                <Button
                  onClick={openModal}
                  label="Start Reading"
                  className="py-[5px] w-[150px] mt-[2rem] px-[10px]"
                />

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                      <LoginPage onSuccess={handleLoginSuccess} onClose={closeModal} />
                    </div>
                  </div>
                )}

              </div>
              <Cards />
            </div>
          </section>
        </div>
        <div className="px-[1rem] md:px-[3rem]">
          <main className="max-w-7xl sticky mb-[4rem] py-[3rem] z-[1000] px-[2rem] md:px-[3.5rem] items-center gap-12 bg-white dark:bg-black border border-prime rounded-xl glow">
            <div className="flex justify-between items-start">
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
                  Featured
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r mt-[-6] from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
              </div>
            <Button
              label="See more"
              className="py-[5px] w-[100px] top-0 px-[10px]"
            />
          </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {mockStories.map((story) => (
                <Link
                  href={`/story/${story.id}`}
                  key={story.id}
                  className="group"
                >
                  <StoryCardV2
                    key={story.id}
                    story={story}
                    showProgress={false}
                    showDescription={false}
                    variant={"continue"}
                  />
                </Link>
              ))}
            </div>
          </main> 
        </div>
        
        <main className="max-w-7xl mx-[1rem] md:mx-[3rem] lg:mx-[3rem] top-[20%] z-[1003] py-[3rem] mb-[4rem] px-[2rem] md:px-[3.5rem] bg-white dark:bg-black border-second border glow-secondary rounded-xl relative">
          <div className="flex justify-between items-start">
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
                Top Rated
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r mt-[-6] from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
            </div>
            <Button
              label="See more"
              className="py-[5px] w-[100px] top-0 px-[10px]"
            />
          </div>
          

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mockStories.map((story) => (
              <Link
                href={`/story/${story.id}`}
                key={story.id}
                className="group"
              >
                {/* <StoryCard story={story} showDescription={false} /> */}

                <StoryCardV2
                  key={story.id}
                  story={story}
                  showProgress={false}
                  showDescription={false}
                  variant={"continue"}
                />
              </Link>
            ))}

            {/* {stories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              description={story.description}
              coverImage={story.coverImage}
              onRead={() => handleReadStory(story.id)}
            />
          ))} */}
          </div>
        </main>
        <main className="flex flex-col px-[1rem] md:px-[3rem] lg:px-0 justify-center w-[100%] mb-[4rem] items-center"> 
          <div className="w-full flex flex-col text-center text-3xl items-center justify-center md:text-3xl font-bold text-black dark:text-white mb-[2rem]">
            <p className="mb-3">Weekly Spotlight</p>
            <div className="h-1 w-20 bg-gradient-to-r mt-[-6] from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
          </div>
          <div className="justify-center w-full lg:w-[60%]  border border-prime rounded-xl glow pb-[-2rem] items-center">
            {mockStories.slice(0, 1).map((story) => (
              <DetailsCard 
                key={story.id}
                story={story}
                storyProgress={true}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer/>
    </main>
  );
}
