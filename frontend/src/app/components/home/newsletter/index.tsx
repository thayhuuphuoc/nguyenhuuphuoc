"use client";
import { useState } from "react";

const Newsletter = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        fetch("https://formsubmit.co/ajax/bhainirav772@gmail.com", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: formData.email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setSubmitted(data.success);
                setFormData({ email: "" });
                setTimeout(() => {
                    setSubmitted(false);
                }, 10000);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <section>
            <div className="bg-primary/5 dark:bg-baseInk py-14 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center justify-between gap-6 sm:gap-10 w-full bg-white dark:bg-surfaceDark rounded-md py-8 px-6 sm:px-12">
                            <div className="flex flex-col gap-4">
                                <h4 className="font-semibold">Subscribe to our Newsletter</h4>
                                <p className="text-navyGray dark:text-white/80 text-base max-w-xl">
                                    Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, special promotions, and the latest news.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-1">
                                <div className="relative w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 rounded-md overflow-hidden bg-white shadow-md">
                                    <input
                                        required
                                        className="flex-grow pl-7 pr-10 py-4 text-navyGray placeholder-gray-400 focus:outline-none"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary/85 text-white font-semibold px-10 py-4  rounded-md hover:bg-primary transition-colors cursor-pointer"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                {submitted && (
                                    <p className="text-primary text-sm mt-2 text-center">Thank you for subscribing!</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
