"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/molecules/NavBar";
import Footer from "@/components/molecules/Footer";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturedSection from "@/components/organisms/FeaturedSection";
import SpotlightSection from "@/components/organisms/SpotlightSection";
import TopRated from "@/components/organisms/TopRated";
import Tags from "@/components/organisms/Tags";
import { fetchCategories, fetchHomeData } from "@/services/story/storyActions";
import { FetchedResponse } from "@/types";

export default function Home() {
  const [fetchedStories, setFetchedStories] = useState<FetchedResponse>({
    featured: [],
    trending: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const getHomePageDataStories = async () => {
      try {
        const response = await fetchHomeData();

        if ("data" in response && response.data) {
          setFetchedStories(response.data);
        } else if ("error" in response && response.error) {
          console.error(
            "API error:",
            response.error.error,
            "Code:",
            response.error.code
          );
          setError(response.error.error);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An error occured while getting featured stories.");
      }
    };

    getHomePageDataStories();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await fetchCategories();
        if (
          "data" in categoriesResponse &&
          Array.isArray(categoriesResponse.data)
        ) {
          setCategories(categoriesResponse.data);
        } else {
          console.error(
            "API error fetching categories:",
            "error" in categoriesResponse ? categoriesResponse.error : "No data"
          );
          setCategories([]); // fallback
        }
      } catch (err) {
        console.error("Unexpected error fetching categories:", err);
        setCategories([]); // fallback
      }
    };

    getCategories();
  }, []);
  return (
    <section className=" bg-white dark:bg-[#141414]">
      <NavBar />
      <div className="min-h-screen relative theme-transition ">
        <HeroSection />
        <FeaturedSection
          featuredStories={fetchedStories.featured}
          error={error}
        />
        <SpotlightSection
          featuredStories={fetchedStories.featured}
          error={error}
        />
        <TopRated fetchedData={fetchedStories} error={error} />
        <Tags categories={categories} />
      </div>
      <Footer categories={categories} />
    </section>
  );
}
