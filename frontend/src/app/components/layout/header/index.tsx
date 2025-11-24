"use client";
import { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import Logo from "../logo";
import ThemeToggler from "./ThemeToggle";
import SearchModal from "./SearchModal";

const Header = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [menuData, setMenuData] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [user, setUser] = useState<{ user: any } | null>(null);
    const [sticky, setSticky] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleSubmenu = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/layout-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setMenuData(data?.menuData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY >= 80);
        };

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    const handleSignOut = () => {
        localStorage.removeItem("user");
        signOut();
        setUser(null);
    };


    return (
        <header className={`fixed w-full top-0 left-0 z-50 bg-white dark:bg-surfaceDark transition-all ease-in-out ${sticky ? "shadow-xl" : ""} `}>
            <div className="container">
                <nav className="py-2">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <Logo />
                        </div>
                        <ul className="hidden lg:flex items-center gap-8">
                            {menuData &&
                                menuData.map((item: any, index: number) => (
                                    <li key={index} className="relative group">
                                        <Link
                                            href={item.href}
                                            className={`py-1.5 flex items-center gap-2 ${pathname === item.href ? 'text-primary font-semibold' : ''}`}
                                        >
                                            <span className="font-medium hover:text-primary">{item.label}</span>
                                            {item?.submenu &&
                                                <>
                                                    <Image src="/images/icon/down-icon.svg" alt="down-icon" width={15} height={15} className="block dark:hidden" />
                                                    <Image src="/images/icon/white-down-arrow.svg" alt="down-icon" width={15} height={15} className="hidden dark:block" />
                                                </>
                                            }
                                        </Link>

                                        {item.submenu && (
                                            <ul className="absolute top-full left-0 bg-white dark:bg-baseInk shadow-md mt-2 p-2 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                {item.submenu.map((subItem: any, subIndex: number) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block whitespace-nowrap px-4 py-2 hover:bg-primary/20 text-sm font-medium rounded-md"
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                        </ul>
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-3.5">
                                <div>
                                    <ThemeToggler />
                                </div>
                                <div className="cursor-pointer" onClick={() => setModalOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M19 11a8 8 0 1 1-16 0a8 8 0 0 1 16 0" opacity="0.16" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" /></g></svg>
                                </div>  
                                <SearchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />                              
                            </div>

                            {user?.user || session?.user ? (
                                <div className="flex items-center gap-4">
                                    <div className="hidden lg:flex items-center gap-3">
                                        <button onClick={() => handleSignOut()}
                                            className='bg-black dark:bg-white font-medium text-white dark:text-black px-4 py-2 rounded-md hover:opacity-85 cursor-pointer'>
                                            Sign Out
                                        </button>
                                    </div>
                                    <div className="relative group flex items-center justify-center">
                                        <Image src={"/images/avatar/user-10.jpg"} alt="avatar" width={35} height={35} className="rounded-full" />
                                        <p
                                            className="absolute w-fit text-sm font-medium text-center z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-primary text-white py-1 px-2 min-w-28 rounded-md shadow-2xl top-full left-1/2 transform -translate-x-1/2 mt-3"
                                        >
                                            {user?.user || session?.user?.name}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="hidden lg:flex items-center gap-3">
                                        <Link
                                            href={'/sign-in'}
                                            className='bg-transparent hover:bg-black dark:hover:bg-white px-4 py-2 border border-black dark:border-white font-medium text-black dark:text-white hover:text-white dark:hover:text-black rounded-md transition-colors duration-500 ease-in-out'>
                                            Sign In
                                        </Link>
                                        <Link
                                            href={'/sign-up'}
                                            className='bg-black dark:bg-white font-medium text-white dark:text-black px-4 py-2 rounded-md hover:opacity-85'>
                                            Sign Up
                                        </Link>
                                    </div>
                                </>
                            )}



                            <div className='flex lg:hidden'>
                                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#FFF" stroke="currentcolor" strokeLinecap="round" strokeWidth="1.5" d="M2 4h12M2 8h12M2 12h12" /></svg>
                                </button>
                            </div>
                        </div>



                    </div>
                </nav>
            </div>


            {/* ------------------------- Mobile sidebar starts ------------------------- */}

            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                menuData={menuData || []}
                openIndex={openIndex}
                toggleSubmenu={toggleSubmenu}
                user={user}
                sessionUser={session?.user}
                handleSignOut={handleSignOut}
            />

        </header>
    )
}

export default Header