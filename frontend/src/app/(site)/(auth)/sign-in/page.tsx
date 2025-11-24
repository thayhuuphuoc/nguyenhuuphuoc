import Signin from "@/app/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign In | BlogForge Sanity Blog Template",
};

const SignIn = () => {
  return (
    <Signin/>
  )
}

export default SignIn