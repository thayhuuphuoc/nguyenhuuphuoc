import BlogDetail from "@/app/components/blog/blog-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Detail | BlogForge Sanity Blog Template",
};

export default function Page() {
    return (
      <BlogDetail/>
    );
};
