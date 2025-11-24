"use client";
import { useBlogContext } from "@/context-api/BlogContext";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    const { posts } = useBlogContext();

    return (
        <section>
            <div className="bg-primary/5 dark:bg-surfaceDark pb-14 md:pb-20 pt-40">
                <div className="container">
                    <div className="flex flex-col gap-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts?.slice(0, 5).map((value: any, index: any) => {
                                return (
                                    <div
                                        key={index}
                                        className={`relative rounded-md hover:shadow-lg hover:scale-[1.01] transition-all ${index < 2 ? "h-[400px]" : "h-[245px]"} ${index === 0 ? "md:col-span-2" : "md:col-span-1"}`}>
                                        {value?.mainImage?.asset?.url &&
                                            <Image
                                                src={value?.mainImage?.asset?.url}
                                                alt="blog cover"
                                                fill
                                                className="object-cover object-center rounded-md absolute inset-0 z-0 transition-transform duration-500"
                                            />
                                        }
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10 rounded-md" />

                                        <div className="absolute top-6 left-6 z-20 group">
                                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
                                                {value?.author?.name}
                                            </div>
                                            <Image
                                                src={value.author?.image?.asset?.url}
                                                alt="author"
                                                width={40}
                                                height={40}
                                                className="rounded-full cursor-pointer"
                                            />
                                        </div>

                                        <div className="absolute top-6 right-6 z-20">
                                            <span className="text-xs font-semibold px-3 py-1 bg-primary text-white rounded-md capitalize">
                                                {value?.categories[0]?.title}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                                            {value?.bedge == "pro" &&
                                                <div className="w-fit flex items-center gap-1.5 px-2 py-1 mb-3 bg-shineYellow rounded-md">
                                                    <Image src={"/images/icon/diamond-icon.svg"} alt="diamond-icon" width={20} height={20} />
                                                    <span className="uppercase font-semibold">{value?.bedge}</span>
                                                </div>
                                            }

                                            <Link href={value?.bedge === 'pro' ? '/pricing' : `/blog/${value?.slug?.current}`}>
                                                {index < 2 ?
                                                    <h4 className="font-semibold mb-6">{value.title}</h4>
                                                    :
                                                    <h6 className="font-semibold mb-6">{value.title}</h6>
                                                }
                                            </Link>

                                            <div className="flex justify-between items-center gap-2">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <Image src={"/images/icon/eye-icon.svg"} alt="eye-icon" width={18} height={18} />
                                                        <p className="text-sm">213</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Image src={"/images/icon/message-icon.svg"} alt="message-icon" width={18} height={18} />
                                                        <p className="text-sm">3</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 24 24"
                                                        height="14"
                                                        width="14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"></path>
                                                    </svg>
                                                    <p className="text-xs font-medium">
                                                        {new Date(value?.publishedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection