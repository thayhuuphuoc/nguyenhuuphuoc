import AuthorDetail from "@/app/components/author/AuthorDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Author Detail | BlogForge Sanity Blog Template",
};

export default function Page() {
    return (
        <AuthorDetail/>
    );
};
