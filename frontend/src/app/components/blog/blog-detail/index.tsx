"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import CommentSection from "@/app/components/blog/CommentSection";
import { PortableText } from "@portabletext/react";
import { useBlogContext } from "@/context-api/BlogContext";
import CommentForm from "../CommentForm";

const BlogDetail = () => {
  const { posts } = useBlogContext();
  const params = useParams();
  const slug = params?.slug;

  if (!posts || posts.length === 0) {
    return <p>Loading...</p>;
  }

  const blog = posts && posts?.find((post: any) => post?.slug?.current === slug);

  if (!blog) return notFound();

  return (
    <section>
      <div className="pb-14 md:pb-20 pt-28 md:pt-40 dark:bg-baseInk">
        <div className="container">
          <div className="shadow-md">
            <div className="relative w-full h-[350px]">
              <Image
                src={blog?.mainImage?.asset?.url}
                alt="cover image"
                width={1140}
                height={350}
                className="w-full h-[350px] object-cover rounded-t-md"
              />
              <span className="absolute bottom-6 right-6 text-xs font-semibold w-fit p-1 px-2.5 text-black bg-white rounded-md capitalize">
                2 min Read
              </span>
            </div>

            <div className="flex flex-col dark:bg-surfaceDark rounded-b-md">
              <div className="relative flex flex-col gap-6 p-6 border-b border-gray-200 dark:border-white/20">
                <div className="group absolute -top-7">
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
                    {blog?.author?.name}
                  </div>
                  <Image
                    src={blog?.author?.image.asset.url}
                    alt="author-image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-sm font-medium w-fit p-1 px-2.5 text-navyGray dark:text-white bg-gray dark:bg-white/20 rounded-md capitalize mt-4">
                    {blog.categories?.map((cat, idx) => (
                      <span key={idx}>{cat.title}</span>
                    ))}
                  </span>
                  <h1 className="font-semibold text-navyGray dark:text-white">{blog?.title}</h1>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Image src="/images/icon/eye-black-icon.svg" alt="eye" width={18} height={18} className="block dark:hidden" />
                      <Image src="/images/icon/eye-white-icon.svg" alt="eye" width={18} height={18} className="hidden dark:block" />
                      <p className="text-sm font-normal text-navyGray dark:text-white/80">213</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/images/icon/message-black-icon.svg" alt="msg" width={18} height={18} className="block dark:hidden" />
                      <Image src="/images/icon/message-white-icon.svg" alt="msg" width={18} height={18} className="hidden dark:block" />
                      <p className="text-sm font-normal text-navyGray dark:text-white/80">3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
                    </svg>
                    <p className="text-xs text-navyGray dark:text-white/80 font-medium">
                      {new Date(blog?.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 gap-7">
                <div className="border-b border-gray-200 blog-content dark:border-white/20">
                  <PortableText value={blog?.body} />
                </div>
                <div className="flex flex-col gap-3 border-b border-gray-200 dark:border-white/20 pb-6">
                  <h4 className="font-semibold text-navyGray dark:text-white">Quotes</h4>
                  <div className="pt-5 pb-4 px-4 rounded-md border-s-2 border-primary bg-primary/5 flex gap-1 items-start">
                    <p className="text-navyGray dark:text-white/80 font-semibold">quotes</p>
                  </div>
                </div>
                <CommentSection />
                <CommentForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
