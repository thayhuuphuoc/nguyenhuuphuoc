"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

type MobileSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    menuData: any[];
    openIndex: number | null;
    toggleSubmenu: (index: number) => void;
    sessionUser: any;
    user: { user: any } | null;
    handleSignOut: () => void;
};

const MobileSidebar = ({ isOpen, onClose, menuData, user, sessionUser,openIndex, toggleSubmenu,handleSignOut }: MobileSidebarProps) => {

    return (
        <>
            {isOpen && (
                <div
                    className='fixed top-0 left-0 w-full h-full bg-black/50 z-40'
                    onClick={onClose}
                />
            )}
            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-baseInk shadow-lg transform transition-transform duration-300 max-w-xs ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } z-50`}
            >
                <div className='flex items-center justify-between p-4'>
                    <h6 className='font-bold'>Menu</h6>
                    <button
                        className="cursor-pointer"
                        onClick={onClose}
                        aria-label='Close mobile menu'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                            <path
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                </div>
                <div className='p-4'>
                    <ul className='flex flex-col gap-0.5'>
                        {menuData && menuData.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    onClick={() => {
                                        if (item.submenu) {
                                            toggleSubmenu(index);
                                        } else {
                                            onClose();
                                        }
                                    }}
                                    className="group py-1.5 px-2.5 flex items-center justify-between gap-2 hover:bg-primary/20 rounded-md"
                                >
                                    <span className="font-medium group-hover:text-primary">{item.label}</span>
                                    {item?.submenu && (
                                        <>
                                            <Image src="/images/icon/down-icon.svg" alt="down-icon" width={15} height={15} className="block dark:hidden" />
                                            <Image src="/images/icon/white-down-arrow.svg" alt="down-icon" width={15} height={15} className="hidden dark:block" />
                                        </>
                                    )}
                                </Link>
                                {item.submenu && openIndex === index && (
                                    <ul className="pl-3 p-2 flex flex-col gap-2.5">
                                        {item.submenu.map((subItem: any, subIndex: number) => (
                                            <li key={subIndex} className="hover:text-primary">
                                                <Link
                                                    href={subItem.href}
                                                    onClick={onClose}
                                                    className="flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0" />
                                                    </svg>
                                                    <span className="text-base font-medium">{subItem.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col gap-3 mt-5'>
                        {user?.user || sessionUser?.user ? (
                            <>
                                <button
                                    onClick={() => handleSignOut()}
                                    className='bg-black dark:bg-white font-medium text-white dark:text-black text-start px-4 py-2 rounded-md hover:opacity-85 cursor-pointer'>
                                    Sign Out
                                </button>
                            </>

                        ) : (
                            <>
                                <Link
                                    href={'/sign-in'}
                                    onClick={onClose}
                                    className='bg-transparent hover:bg-black dark:hover:bg-white px-4 py-2 border border-black dark:border-white font-medium text-black dark:text-white hover:text-white dark:hover:text-black rounded-md'>
                                    Sign In
                                </Link>
                                <Link
                                    href={'/sign-up'}
                                    onClick={onClose}
                                    className='bg-black dark:bg-white font-medium text-white dark:text-black text-start px-4 py-2 rounded-md hover:opacity-85 cursor-pointer'>
                                    Sign Up
                                </Link>
                            </>

                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSidebar;
