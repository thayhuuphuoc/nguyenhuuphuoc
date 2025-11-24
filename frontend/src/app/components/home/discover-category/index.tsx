"use client";
import CategoryComp from "./CategoryComp";
import { useBlogContext } from "@/context-api/BlogContext";

export default function DiscoverCategory() {

  const { posts } = useBlogContext()
 

  return (
    <CategoryComp blogs={posts} />
  )
};

