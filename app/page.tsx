import React from "react";
import NavBar from "@/components/molecules/NavBar";
import Footer from "@/components/molecules/Footer";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturedSection from "@/components/organisms/FeaturedSection";
import SpotlightSection from "@/components/organisms/SpotlightSection";
import TopRated from "@/components/organisms/TopRated";
import Tags from "@/components/organisms/Tags";

export default function Home() {

  return (
    <section className=" bg-white dark:bg-[#141414]">
      <NavBar />
      <div className="min-h-screen relative theme-transition ">
        <HeroSection/>
        <FeaturedSection/>
        <SpotlightSection/>
        <TopRated/>
        <Tags/>
      </div>
      <Footer />
    </section>
  );
}
