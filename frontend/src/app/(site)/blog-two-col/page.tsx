import BlogTwocolListing from "@/app/components/blog/blog-twocol-listing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Two-col Listing | BlogForge Sanity Blog Template",
};

export default function Page() {
    return (
        <BlogTwocolListing/>
    );
};
