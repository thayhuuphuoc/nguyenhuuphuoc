"use client";
import Image from "next/image";
import { useEffect, useState } from "react";


const CommentSection = () => {
    const [commentList, setCommentList] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')

                const data = await res.json()
                setCommentList(data?.blogCommentList)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="flex flex-col gap-3 border-b border-gray-200 dark:border-white/20 pb-6">
            <div className="flex items-center gap-3">
                <h4 className="font-semibold text-navyGray dark:text-white">Comments</h4>
                <div className="flex flex-col bg-primary/10 w-fit py-1.5 px-3.5 rounded-md">
                    <p className="text-primary font-semibold">3</p>
                </div>
            </div>
            {commentList?.map((value: any, index: any) => {
                return (
                    <div key={index} className={`bg-primary/10 px-6 py-5 rounded-md flex flex-col gap-3 ${value?.reply ? "ml-8" : ""}`}>
                        <div className="flex items-center gap-4">
                            <Image src={value?.image} alt="commenter-img" width={35} height={35} className="rounded-full" />
                            <p className="font-semibold text-navyGray dark:text-white">{value?.name}</p>
                        </div>
                        <p className="text-sm font-normal text-navyGray dark:text-white/80">{value?.comment}</p>
                        {!value?.reply &&
                            <button className="bg-primary w-fit p-1.5 rounded-full cursor-pointer">
                                <Image src={"/images/icon/reply-icon.svg"} alt="reply-icon" width={20} height={20} />
                            </button>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default CommentSection