"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PricingSection = () => {
    const [pricingList, setPricingList] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')

                const data = await res.json()
                setPricingList(data?.pricingList)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <section>
            <div className="pb-14 md:pb-20 pt-28 md:pt-40 dark:bg-baseInk">
                <div className="container">
                    <div className="flex flex-col gap-8 md:gap-14">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-center text-center  max-w-lg gap-3.5">
                                <h1 className="font-semibold">Plans That Work for You</h1>
                                <p className="font-medium text-navyGray dark:text-white/80">Flexible options designed for individuals, teams, and businesses — find your perfect fit.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-8">
                            {pricingList && pricingList?.map((value: any, index: any) => {
                                return (
                                    <div key={index} className="relative rounded-md shadow-card hover:scale-[1.01] p-5 md:p-7">

                                        <div className="flex flex-col gap-6 mb-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-medium text-navyGray dark:text-white/80 uppercase">{value?.plan_name}</p>
                                                {value?.popular &&
                                                    <div className="text-xs font-semibold w-fit p-1 px-2.5 text-shineYellow bg-shineYellow/15 rounded-md capitalize">
                                                        <span>{value?.popular}</span>
                                                    </div>
                                                }
                                            </div>
                                            <Image src={value?.plan_img} alt="plan-image" width={90} height={90} />
                                            <div className="flex items-end gap-1.5">
                                                <h2 className="flex items-start gap-1 font-bold text-navyGray dark:text-white">
                                                    {value?.plan_price != "Free" && <span className="text-base">$</span> }
                                                    {value?.plan_price}
                                                </h2>
                                                {value?.plan_price != "Free" && <span className="text-sm text-navyGray dark:text-white/80 pb-1">/mo</span>}
                                            </div>

                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <ul className="flex flex-col">
                                                    {value?.plan_feature?.map((item: any, index: any) => {
                                                        return (
                                                            <li key={index} className="flex items-center gap-2 py-2">
                                                                <Image src={"/images/icon/check-icon.svg"} alt="check-icon" width={20} height={20} />
                                                                <span className="text-sm font-medium text-navyGray dark:text-white/80">{item}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <Link href="/" className="bg-primary hover:bg-primary/80 text-center px-4 py-2 font-medium text-white rounded-md transition-colors duration-500 ease-in-out">
                                                Choose {value?.plan_name}
                                            </Link>
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

export default PricingSection