import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SocialSignIn = ({ actionText = "Sign In" }) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:flex items-center">
            <button
                onClick={() => signIn("google")}
                className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border border-gray-200 dark:border-white/20 p-3  duration-200 ease-in hover:bg-black/5 dark:hover:bg-white/5">
                {actionText}
                <Image src="/images/authicon/google-icon.svg" width={22} height={22} alt="google-icon" />
            </button>

            <button
                onClick={() => signIn("github")}
                className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border border-gray-200 dark:border-white/20 p-3  duration-200 ease-in hover:bg-black/5 dark:hover:bg-white/5">
                {actionText}
                <Image src="/images/authicon/github-icon.svg" width={22} height={22} alt="github-icon" />
            </button>
        </div>
    );
};

export default SocialSignIn;
