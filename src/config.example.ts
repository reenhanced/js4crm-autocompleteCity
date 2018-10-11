export interface responseMapping {
    [key:string]: string|((address: object) => string);
};

export interface autocompleteConfig {
  azureSubscriptionKey: string;
  autocompleteFields: string[];
  responseMapping: responseMapping;
};

export var config: autocompleteConfig = {
  // Create a maps resource from here (2018-10-11):
  //    https://portal.azure.com/#blade/Microsoft_Azure_Marketplace/GalleryFeaturedMenuItemBlade/selectedMenuItemId/home/searchQuery/maps/resetMenuId/
  //    https://azure.microsoft.com/en-us/services/azure-maps/
  azureSubscriptionKey: 'YOUR_AZURE_MAPS_KEY_HERE',
  autocompleteFields: ['address1_line1'],

  // When a value for the autocomplete above is selected,
  // We'll send out another json request to get details on the
  // selected city.
  //
  // When that response comes back, this block configures
  // how values in the response object will be mapped to form values
  // in Xrm
  responseMapping: {
    // Dynamics field to update => string|function to autofill on select
    'address1_line1': (address: any) => { return `${address.streetNumber} ${address.streetName.split(',')[0]}` },
    'address1_city': 'municipalitySubdivision',
    'address1_stateorprovince': 'countrySubdivision',
    'address1_country': 'countryCodeISO3'
  }
};

export default config;