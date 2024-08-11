export type certificatesParams = {
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

export type waitlistParams = {
  name: string;
  email: string;
  designation: string;
};

export type newsLetterParams = {
  email: string;
};
