"use client";
import SectionTitle from "../common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Pricing"
            title="Affordable and Flexible Pricing for Everyone"
            paragraph="At Time for Music, we believe in bringing fun and creativity to your music experience without breaking the bank. Choose the plan that fits your needs and start creating unforgettable moments."
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pricingData.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
