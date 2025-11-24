"use client";
import { useState } from "react";
import Loader from "../../shared/loader";
import Logo from "../../layout/logo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to validate email
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required.");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setIsEmailSent(true);
    }, 2000);
  };

  return (
    <section>
      <div className="relative w-full pt-32 sm:pt-60 pb-16 sm:pb-40 flex items-center justify-center dark:bg-baseInk h-[85vh]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="dark:bg-surfaceDark relative shadow-lg mx-auto max-w-lg overflow-hidden rounded-lg px-8 py-14 text-center sm:px-12 md:px-16">
                <div className="mb-10 flex justify-center">
                  <Logo />
                </div>

                {isEmailSent ? (
                  <div className="flex flex-col items-center gap-2">
                    <h5 className="text-black dark:text-white font-bold">
                      Forgot Your Password?
                    </h5>
                    <p className="text-navyGray dark:text-white/80">
                      Please check your inbox for the new password.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5 text-left">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validateEmail(e.target.value);
                        }}
                        required
                        className="input-class"
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="flex w-full px-5 py-3 font-medium cursor-pointer items-center justify-center transition duration-500 ease-in-out rounded-md border border-black dark:border-white bg-black dark:bg-white hover:bg-transparent dark:hover:bg-transparent text-white dark:text-black hover:text-black dark:hover:text-white"
                        disabled={loader}
                      >
                        {loader ? <Loader /> : "Send Email"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
