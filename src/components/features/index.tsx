import SectionTitle from "../common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { useTranslations } from 'next-intl';

const Features = () => {
  const t = useTranslations('features');

  return (
    <section id="features" className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle={t('subtitle')}
          title={t('title')}
          paragraph=""
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={{
              ...feature,
              title: t(`items.${feature.id}.title`),
              paragraph: t(`items.${feature.id}.description`)
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
