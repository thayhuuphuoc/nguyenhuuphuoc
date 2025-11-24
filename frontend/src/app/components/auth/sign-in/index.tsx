"use client";
import Logo from "@/app/components/layout/logo"
import SocialSignIn from "../SocialSignIn"
import Link from "next/link";
import Loader from "@/app/components/shared/loader";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signin = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    }); //login data state

    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
    }); //validation state

    // Input validation function
    const validateForm = () => {
        let errors = { email: "", password: "" };
        let isValid = true;

        if (!loginData.email) {
            errors.email = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
            errors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!loginData.password) {
            errors.password = "Password is required.";
            isValid = false;
        } else if (loginData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
            isValid = false;
        }
        setValidationErrors(errors);
        return isValid;
    };

    // form handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            localStorage.setItem("user", JSON.stringify({ user: loginData.email }));
            router.push("/");
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="relative w-full pt-44 pb-20 flex items-center justify-center dark:bg-baseInk">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="dark:bg-surfaceDark relative shadow-xl mx-auto max-w-lg overflow-hidden rounded-md px-6 py-12 text-center sm:px-12 md:px-16">
                                <div className="mb-10 flex justify-center">
                                    <Logo />
                                </div>

                                <SocialSignIn actionText="Sign In" />

                                <span className="z-1 relative my-8 block text-center">
                                    <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-primary/20 dark:bg-white/20"></span>
                                    <span className="text-sm relative z-10 inline-block text-navyGray dark:text-white/80 bg-white dark:bg-surfaceDark px-3">
                                        OR
                                    </span>
                                </span>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5 text-left">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) =>
                                                setLoginData({ ...loginData, email: e.target.value })
                                            }
                                            className={`input-class ${validationErrors.email ? 'border-red-500' : 'border-stroke'} `}
                                        />
                                        {validationErrors.email && (
                                            <p className="text-red-500 dark:text-red-500 text-sm mt-1">{validationErrors.email}</p>
                                        )}
                                    </div>
                                    <div className="mb-5 text-left">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) =>
                                                setLoginData({ ...loginData, password: e.target.value })
                                            }
                                            className={`input-class ${validationErrors.email ? 'border-red-500' : 'border-stroke'}`}
                                        />
                                        {validationErrors.password && (
                                            <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                                        )}
                                    </div>
                                    <div className="mb-9">
                                        <button
                                            type="submit"
                                            className="flex w-full px-5 py-3 font-medium cursor-pointer items-center justify-center transition duration-500 ease-in-out rounded-md border border-black dark:border-white bg-black dark:bg-white hover:bg-transparent dark:hover:bg-transparent text-white dark:text-black hover:text-black dark:hover:text-white"
                                        >
                                            Sign In {loading && <Loader />}
                                        </button>
                                    </div>
                                </form>

                                <Link
                                    href="/forgot-password"
                                    className="mb-1 inline-block text-navyGray dark:text-white/80 hover:text-black dark:hover:text-white"
                                >
                                    Forget Password?
                                </Link>
                                <p className="text-navyGray dark:text-white/80">
                                    Not a member yet?{" "}
                                    <Link href="/sign-up" className="text-navyGray dark:text-white/80 hover:text-black dark:hover:text-white">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signin