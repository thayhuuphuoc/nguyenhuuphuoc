"use client";
import AuthorCard from "@/app/components/shared/author-card";
import { useBlogContext } from "@/context-api/BlogContext";

export default function AuthorListing() {
    const { posts } = useBlogContext()
    
        const uniqueAuthors = posts.filter(
            (author, index, self) =>
                index === self.findIndex((a) => a.author?.slug?.current === author.author?.slug?.current)
        );

    return (
        <section>
            <div className="pb-14 md:pb-20 pt-28 md:pt-40 dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col gap-9 md:gap-14 pt-9 pb-24">
                        <div className="flex flex-col items-center text-center gap-3.5">
                            <h1 className="font-semibold">Creators Behind the Content</h1>
                            <p className="font-medium text-navyGray dark:text-white/80 max-w-lg">Learn more about the talented writers and contributors shaping every blog you read.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                            {uniqueAuthors.map((value, index) => (
                                <AuthorCard key={index} author={value} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
