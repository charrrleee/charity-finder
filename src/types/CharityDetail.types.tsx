
interface CharityDetailType {
    id: string;
    name: string;
    isDisbursable: boolean;
    locationAddress: string;
    ein: string;
    description: string;
    primarySlug: string;
    logoCloudinaryId: string;
    coverImageCloudinaryId: string;
    nteeCode: string;
    nteeCodeMeaning: {
      majorCode: string;
      majorMeaning: string;
      decileCode: string;
      decileMeaning: string;
    };
    hasAdmin: boolean;
    directDisbursement: boolean;
    websiteUrl: string;
    logoUrl: string;
    coverImageUrl: string;
    profileUrl: string;
  }

  export default CharityDetailType;