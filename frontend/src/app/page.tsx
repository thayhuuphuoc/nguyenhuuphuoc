import DiscoverCategory from "@/app/components/home/discover-category";
import HeroSection from "@/app/components/home/hero";
import Newsletter from "@/app/components/home/newsletter";
import TopAuthor from "@/app/components/home/top-author.tsx";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BlogForge",
};

export default function Home() {
  return (
    <>
      <HeroSection/>
      <DiscoverCategory/>
      <TopAuthor/>
      <Newsletter/>
    </>
  );
}
