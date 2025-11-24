import BlogListing from "@/app/components/blog/blog-listing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | BlogForge Sanity Blog Template",
};

export default function Page() {
    return (
        <BlogListing/>
    );
};
