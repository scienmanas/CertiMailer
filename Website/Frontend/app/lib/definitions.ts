import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export type MarqueeProps = {
  svg: IconType;
  text: string;
};

export type CardProps = {
  card: {
    svg: StaticImageData;
    alt: string;
    head: string;
    description: string;
    className: string;
  };
};

export type emailParams = {
  to: string;
  subject: string;
  text: string;
  fromName: string;
  toName?: string;
};

export type FetchedCertificateDataProps = {
  fetchedData: {
    organization_logo_url: string;
    organization_name: string;
    organization_id: string;
    organization_status: string;
    organization_email: string;
    _id: string;
    issued_to: string;
    issued_email: string;
    issued_date: string;
    expiry_date: string;
  };
};

export type submissionLoaderProps = {
  width: number;
  height: number;
  color: string;
};
