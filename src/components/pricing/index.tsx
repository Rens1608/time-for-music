"use client";
import SectionTitle from "../common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const t = useTranslations('pricing');

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle={t('subtitle')}
            title={t('title')}
            paragraph={t('description')}
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pricingData.map((product, i) => (
            <PricingBox key={i} product={{
              ...product,
              nickname: t(`packages.${product.nickname.toLowerCase()}.name`),
              offers: product.offers.map((_, index) => t(`packages.${product.nickname.toLowerCase()}.features.${index}`)),
              button_text: t(`packages.${product.nickname.toLowerCase()}.button`)
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
