import PricingSection from "@/app/components/pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing | BlogForge Sanity Blog Template",
};

const Pricing = () => {
  return (
    <PricingSection/>
  )
}

export default Pricing