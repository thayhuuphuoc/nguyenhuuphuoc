import AuthorListing from "@/app/components/author/AuthorListing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Author Listing | BlogForge Sanity Blog Template",
};

export default function Page() {
    return (
        <AuthorListing/>
    );
};
