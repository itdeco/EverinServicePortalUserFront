import {DefaultSeoProps, NextSeoProps} from "next-seo";
import {SiteType} from "@/types/SiteType";
import {METADATA} from "@/utils/constant";

type SeoConfigType = {
    siteType: SiteType;
    title?: string;
    description?: string;
    url?: string;
}

export const useSeoConfig = ({ siteType, title, description, url }: SeoConfigType) => {
    const SeoNextConfigProps: NextSeoProps = {
        title: !title ? SiteType.EverTime === siteType ? METADATA.EverTime.metaTitle : METADATA.EverPayroll.metaTitle : title,
        description: !description ? SiteType.EverTime === siteType ? METADATA.EverTime.description : METADATA.EverPayroll.description : description,
        additionalLinkTags: [
            {
                rel: "icon",
                href: SiteType.EverTime === siteType ? "/assets/img/icon-evertime.svg" : "/assets/img/icon-everpayroll.svg",
            }
        ],
        openGraph: {
            title: !title ? SiteType.EverTime === siteType ? METADATA.EverTime.metaTitle : METADATA.EverPayroll.metaTitle : title,
            url: SiteType.EverTime === siteType ? `https://www.evertime.co.kr${url || "/"}` : `https://www.evertime.co.kr${url || "/payroll"}`,
            description: !description ? SiteType.EverTime === siteType ? METADATA.EverTime.description : METADATA.EverPayroll.description : description,
        }
    }

    const SeoDefaultConfigProps: DefaultSeoProps = {
        title: !title ? SiteType.EverTime === siteType ? METADATA.EverTime.metaTitle : METADATA.EverPayroll.metaTitle : title,
        description: !description ? SiteType.EverTime === siteType ? METADATA.EverTime.description : METADATA.EverPayroll.description : description,
        additionalLinkTags: [
            {
                rel: "icon",
                href: SiteType.EverTime === siteType ? "/assets/img/icon-evertime.svg" : "/assets/img/icon-everpayroll.svg",
            }
        ],
        openGraph: {
            title: !title ? SiteType.EverTime === siteType ? METADATA.EverTime.metaTitle : METADATA.EverPayroll.metaTitle : title,
            description: !description ? SiteType.EverTime === siteType ? METADATA.EverTime.description : METADATA.EverPayroll.description : description,
            type: "website",
            locale: "ko_KR",
            siteName: !title ? SiteType.EverTime === siteType ? METADATA.EverTime.metaTitle : METADATA.EverPayroll.metaTitle : title,
            images: [
                {
                    url: !url ? SiteType.EverTime === siteType ? "/assets/img/logo-evertime-og.png" : "/assets/img/logo-payroll-og.png" : url,
                }
            ]
        }
    }

    return { SeoNextConfigProps, SeoDefaultConfigProps };
}
