"use client"
import AuthorCard from "@/app/components/shared/author-card";
import { useBlogContext } from "@/context-api/BlogContext";
import Link from "next/link";

const TopAuthor = () => {
    const { posts } = useBlogContext()

    const uniqueAuthors = posts.filter(
        (author, index, self) =>
            index === self.findIndex((a) => a.author?.slug?.current === author.author?.slug?.current)
    );

    return (
        <section>
            <div className="dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col gap-7 md:gap-14 py-10">
                        <div className="flex flex-col sm:flex-row items-center text-center justify-between gap-3.5">
                            <h3 className="font-semibold">Explore Authors</h3>
                            <Link href="/author">
                                <p className="text-navyGray dark:text-white/80 font-medium border-b-2 border-primary/70 hover:text-primary dark:hover:text-primary">View all Authors</p>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                            {uniqueAuthors.slice(0, 3).map((value, index) => (
                                <AuthorCard key={index} author={value} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopAuthor;
