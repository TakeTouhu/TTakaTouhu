export type CompanyType = '株式会社' | '合同会社' | '合名会社' | '合資会社';

export interface BasicInfo {
  companyName: string;
  companyType: CompanyType;
  capital: number;
  fiscalYearStartMonth: number;
  establishmentDate: string;
}

export interface Director {
  id: string;
  name: string;
  address: string;
  isRepresentative: boolean;
}

export interface OfficerInfo {
  directors: Director[];
  auditor?: string;
  auditorAddress?: string;
}

export interface ShareInfo {
  authorizedShares: number;
  issuedShares: number;
  parValue: number;
  hasTransferRestriction: boolean;
}

export interface BusinessPurpose {
  id: string;
  text: string;
}

export interface AddressInfo {
  prefecture: string;
  city: string;
  streetAddress: string;
  buildingName?: string;
}

export interface WizardState {
  currentStep: number;
  basicInfo: Partial<BasicInfo>;
  officerInfo: Partial<OfficerInfo>;
  shareInfo: Partial<ShareInfo>;
  businessPurposes: BusinessPurpose[];
  addressInfo: Partial<AddressInfo>;
}
