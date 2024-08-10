import { StaticImageData } from "next/image";

export type MarqueeProps = {
  svgs: string[];
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

export type IdFetchedDataProps = {
  fetchedData: {
    orgLogo: StaticImageData;
    orgName: string;
    orgId: string;
    orgStatus: string;
    orgEmail: string;
    issuedToName: string;
    issueId: string;
    issuedToEmail: string;
    issuedDate: string;
    expiryDate: string;
  };
};
