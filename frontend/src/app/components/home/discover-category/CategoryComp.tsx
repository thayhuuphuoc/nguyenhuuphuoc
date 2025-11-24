"use client";

import { useState } from "react";
import BlogCard from "@/app/components/shared/blog-card";
import Link from "next/link";

const CategoryComp = ({ blogs }: { blogs: any[] }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categoriesWithCount = blogs.reduce((acc, blog) => {
        
        const tag = blog?.categories[0]?.title || "Uncategorized";
        
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const categoryButtons = [
        { tag: "All", count: blogs.length },
        ...Object.entries(categoriesWithCount).map(([tag, count]) => ({
            tag,
            count,
        })),
    ];

    const filteredBlogs =
        selectedCategory === "All"
            ? blogs
            : blogs.filter((blog) => blog?.categories[0]?.title === selectedCategory);            

    const capitalizeWords = (str: string) =>
        str.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <section>
            <div className="dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col items-center gap-9 md:gap-14 py-14 md:py-20">
                        <div className="flex flex-col items-center text-center gap-3.5">
                            <h1 className="font-semibold">Explore Categories</h1>
                            <p className="font-medium text-navyGray dark:text-white/80">
                                Choose a category to explore related content -- Find what interests you
                            </p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categoryButtons.map(({ tag, count }: any) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedCategory(tag)}
                                    className={`px-4 py-2 rounded-md text-base font-medium border transition-all cursor-pointer hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white duration-500 ${selectedCategory === tag
                                        ? "bg-black dark:bg-white text-white dark:text-black dark:border-white/20"
                                        : "bg-transparent text-black dark:text-white border-black/20 dark:border-white/20"
                                        }`}
                                >
                                    {capitalizeWords(tag)} ({count.toString().padStart(2, "0")})
                                </button>
                            ))}
                        </div>

                        {/* Blog Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.slice(0, 6).map((blog, index) => {                                
                                return (
                                    <BlogCard key={index} blog={blog} />
                                )
                            })}
                        </div>

                        <Link
                            href="/blog"
                            className="bg-transparent hover:bg-black dark:hover:bg-white px-6 py-3 border border-black dark:border-white font-medium text-black dark:text-white dark:hover:text-black hover:text-white rounded-md transition-colors duration-500 ease-in-out"
                        >
                            <span>View All Blogs</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryComp;
