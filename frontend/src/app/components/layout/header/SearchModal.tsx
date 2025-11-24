'use client';

import { useBlogContext } from '@/context-api/BlogContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [search, setSearch] = useState('');
    const { posts } = useBlogContext()

    if (!isOpen) return null;

    const filteredPosts = posts?.filter((post) =>
        post?.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-30 z-50">
            <div className="relative flex flex-col gap-5 bg-white w-full max-w-xl rounded-lg shadow-lg p-4 sm:p-6 m-5">
                <button onClick={onClose} className="absolute top-4 right-5 text-black/80 hover:text-black text-lg cursor-pointer">✖</button>
                <h6 className='font-semibold'>Blogs</h6>
                <input
                    type="text"
                    placeholder="Type blog title to search..."
                    className="input-class"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className='max-h-[350px] overflow-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
                        {filteredPosts?.length > 0 ? (
                            filteredPosts.map((value, index) => (
                                <div key={index} className='group flex flex-col gap-1'>
                                    <div className='rounded-md overflow-hidden w-full' onClick={onClose}>
                                        <Link href={`/blog/${value?.slug?.current}`}>
                                            <Image
                                                src={value?.mainImage?.asset?.url}
                                                alt='image'
                                                width={250}
                                                height={180}
                                                className='rounded-md group-hover:scale-105 w-full'
                                            />
                                        </Link>
                                    </div>
                                    <Link href={`/blog/${value?.slug?.current}`}>
                                        <p className='font-semibold text-base' onClick={onClose}>
                                            {value?.title}
                                        </p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-col gap-2 items-center col-span-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.25" d="M5 19a2 2 0 0 0 2 2h4.75a.25.25 0 0 0 .25-.25V16a2 2 0 0 1 2-2h4.75a.25.25 0 0 0 .25-.25V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" /><path fill="currentColor" d="M13 16v4.396c0 .223.27.335.427.177l5.146-5.146a.25.25 0 0 0-.177-.427H14a1 1 0 0 0-1 1" /></svg>
                                <p className="text-center text-gray-500 col-span-full">No data found</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
