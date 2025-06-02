import Breadcrumb from "@/components/common/Breadcrumb";
import NotFound from "@/components/notFound";
import { Metadata } from "next";
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
    title: "404 Page | Time for Music",
};

const ErrorPage = () => {
    const t = useTranslations('not-found');

    return (
        <>
            <Breadcrumb pageName={t('breadcrumb')} />
            <NotFound />
        </>
    );
};

export default ErrorPage;