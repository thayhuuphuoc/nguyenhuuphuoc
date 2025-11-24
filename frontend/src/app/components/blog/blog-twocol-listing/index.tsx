"use client";
import { useBlogContext } from '@/context-api/BlogContext'
import React from 'react'
import BlogCard from '../../shared/blog-card'

const BlogTwocolListing = () => {
    const { posts } = useBlogContext()
    return (
        <section>
            <div className="pb-14 md:pb-20 pt-28 md:pt-40 dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col gap-8 md:gap-14">
                        <div className="flex flex-col items-center text-center gap-3.5">
                            <h1 className="font-semibold">Read, Learn & Grow</h1>
                            <p className="font-medium text-navyGray dark:text-white/80 max-w-lg">From expert advice to behind-the-scenes stories — explore content designed for curious minds.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {posts.map((post: any) => (
                                <BlogCard key={post._id} blog={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogTwocolListing