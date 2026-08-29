export type AppStatus =
  | "Draft"
  | "Submitted"
  | "In Review"
  | "Approved"
  | "Rejected";

export interface Applicant {
  firstName: string;
  lastName: string;
  dob: string;
  nationalId: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface FinancialProfile {
  employmentStatus: string;
  employer: string;
  annualIncome: string;
  sourceOfFunds: string;
}

export type AccountType = "Personal" | "Business";

export interface BeneficialOwner {
  fullName: string;
  ownershipPct: string;
  dob: string;
  nationalId: string;
}

export interface BusinessProfile {
  legalName: string;
  tradingName: string;
  entityType: string;
  registrationNumber: string;
  incorporationDate: string;
  industry: string;
  country: string;
  employeeCount: string;
  expectedMonthlyVolume: string;
}

export interface TimelineEvent {
  label: string;
  time: string;
  state: "done" | "current" | "todo";
}

export interface Application {
  id: string;
  applicant: string;
  product: string;
  submitted: string;
  status: AppStatus;
  timeline: TimelineEvent[];
  accountType?: AccountType;
  business?: BusinessProfile;
  beneficialOwners?: BeneficialOwner[];
}

export const statusClass: Record<AppStatus, string> = {
  Draft: "draft",
  Submitted: "submitted",
  "In Review": "review",
  Approved: "approved",
  Rejected: "rejected",
};

export const emptyApplicant: Applicant = {
  firstName: "",
  lastName: "",
  dob: "",
  nationalId: "",
  email: "",
  phone: "",
  addressLine: "",
  city: "",
  postalCode: "",
  country: "United States",
};

export const emptyFinancial: FinancialProfile = {
  employmentStatus: "",
  employer: "",
  annualIncome: "",
  sourceOfFunds: "",
};

export const emptyBusiness: BusinessProfile = {
  legalName: "",
  tradingName: "",
  entityType: "",
  registrationNumber: "",
  incorporationDate: "",
  industry: "",
  country: "United States",
  employeeCount: "",
  expectedMonthlyVolume: "",
};

export const emptyOwner: BeneficialOwner = {
  fullName: "",
  ownershipPct: "",
  dob: "",
  nationalId: "",
};
