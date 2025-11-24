"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialSignIn from "../SocialSignIn";
import { useState } from "react";
import Loader from "../../shared/loader";
import Logo from "../../layout/logo";

const SignUp = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Validation functions
    const validateName = (name: string) => {
        if (!name.trim()) return "Name is required";
        if (!/^[a-zA-Z\s]{3,}$/.test(name)) return "Name must be at least 3 characters and contain only letters";
        return "";
    };

    const validateEmail = (email: string) => {
        if (!email.trim()) return "Email is required";
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return "Enter a valid email address";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate on change
        setErrors((prev) => ({
            ...prev,
            [name]: name === "name"
                ? validateName(value)
                : name === "email"
                ? validateEmail(value)
                : validatePassword(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate all fields before submitting
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({ name: nameError, email: emailError, password: passwordError });
        if (nameError || emailError || passwordError) {
            return;
        }

        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            localStorage.setItem("user", JSON.stringify({ user: formData.name }));
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
                                <div className="mb-8 flex justify-center">
                                    <Logo />
                                </div>

                                <SocialSignIn actionText="Sign Up" />

                                <span className="z-1 relative my-8 block text-center">
                                    <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-primary/20 dark:bg-white/20"></span>
                                    <span className="text-sm relative z-10 inline-block text-navyGray dark:text-white/80 bg-white dark:bg-surfaceDark px-3">
                                        OR
                                    </span>
                                </span>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4 text-left">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`input-class ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-stroke'}`} />
                                        {errors.name && <p className="text-red-500 dark:text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="mb-4 text-left">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`input-class
                                                ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-stroke'}`}
                                        />
                                        {errors.email && <p className="text-red-500 dark:text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="mb-4 text-left">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`input-class ${errors.password ? 'border-red-500 dark:border-red-500' : 'border-stroke'} `}
                                        />
                                        {errors.password && <p className="text-red-500 dark:text-red-500 text-sm mt-1">{errors.password}</p>}
                                    </div>
                                    <div className="mb-6">
                                        <button
                                            type="submit"
                                            className="flex w-full px-5 py-3 font-medium cursor-pointer items-center justify-center transition duration-500 ease-in-out rounded-md border border-black dark:border-white bg-black dark:bg-white hover:bg-transparent dark:hover:bg-transparent text-white dark:text-black hover:text-black dark:hover:text-white"
                                            disabled={loading}
                                        >
                                            Sign Up {loading && <Loader />}
                                        </button>
                                    </div>
                                </form>

                                <div className="flex flex-col max-w-xs mx-auto gap-2">
                                    <p className="text-navyGray dark:text-white/80">
                                        By creating an account, you agree with our{" "}
                                        <Link href="/privacy-policy" className="text-navyGray dark:text-white/80 hover:text-black dark:hover:text-white">
                                            Privacy policy
                                        </Link>
                                    </p>

                                    <p className="text-navyGray dark:text-white/80">
                                        Already have an account?
                                        <Link href="/sign-in" className="text-navyGray dark:text-white/80 hover:text-black dark:hover:text-white">
                                            {" "}Sign In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
