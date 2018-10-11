declare interface responseMapping {
    [key:string]: string|((address: azureMapsGetSearchAddress.Address) => string);
}

declare interface autocompleteConfig {
  azureMapsSubscriptionKey: string;
  autocompleteFields: string[];
  responseMapping: responseMapping;
}

declare namespace azureMapsGetSearchAddress {
  interface Position {
    lat: number;
    lon: number;
  }
  interface Result {
    type: string;
    id: string;
    score: number;
    address: Address;
    position: Position;
    viewport: {
      topLeftPoint: Position;
      btmRightPoint: Position;
    };
    entryPoints: [{
      type: string;
      position: Position;
    }];
  }

  interface Address {
    streetNumber: string;
    streetName: string;
    municipality: string;
    municipalitySubdivision?: string;
    countrySecondarySubdivision?: string;
    countryTertiarySubdivision?: string;
    countrySubdivision?: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    countrySubdivisionName: string;
    [key: string]: string | undefined;
  }
}
