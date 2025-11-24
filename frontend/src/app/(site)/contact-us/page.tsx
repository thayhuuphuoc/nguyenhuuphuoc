import ContactUs from "@/app/components/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact | BlogForge Sanity Blog Template",
};

const Contact = () => {
  return (
    <ContactUs/>
  )
}

export default Contact