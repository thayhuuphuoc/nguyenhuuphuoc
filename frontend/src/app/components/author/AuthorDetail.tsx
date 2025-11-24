"use client";
import BlogCard from "@/app/components/shared/blog-card";
import { useBlogContext } from "@/context-api/BlogContext";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthorDetail() {
    const { posts } = useBlogContext()
    const pathname = usePathname();
    const slug = pathname?.split("/").pop();

    const authorBlogs = posts.filter(
        (blog) => blog?.author?.slug?.current === slug
    );

    if (authorBlogs.length === 0) {
        return <div className="p-10">No blogs found for this author.</div>;
    }

    const { author } = authorBlogs[0];
    const author_name = author?.name;
    const author_detail = author?.bio?.[0]?.children?.[0]?.text;
    const author_image = author?.image?.asset?.url;
    const author_position = author?.position;

    return (
        <section>
            <div className="pb-14 md:pb-20 pt-28 md:pt-40 dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col gap-7 md:gap-16">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-7">
                            {author_image && (
                                <Image
                                    src={author_image as string}
                                    alt={author_name as string}
                                    width={200}
                                    height={200}
                                    className="rounded-full w-40 h-40 sm:w-56 sm:h-56 md:w-60 md:h-60 object-cover"
                                />
                            )}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold dark:text-white">{author_name}</h1>
                                    <p className="text-sm text-navyGray dark:text-white/80">{author_position}</p>
                                </div>
                                <p className="font-medium text-navyGray max-w-lg dark:text-white/80">{author_detail}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authorBlogs.map((blog: any, index: any) => (
                                <BlogCard key={index} blog={blog} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
