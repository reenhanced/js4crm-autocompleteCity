/// <reference path="../types/application.d.ts" />

export var config: autocompleteConfig = {
  // Create a maps resource from here (2018-10-11):
  //    https://portal.azure.com/#blade/Microsoft_Azure_Marketplace/GalleryFeaturedMenuItemBlade/selectedMenuItemId/home/searchQuery/maps/resetMenuId/
  //    https://azure.microsoft.com/en-us/services/azure-maps/
  azureMapsSubscriptionKey: 'YOUR_AZURE_MAPS_KEY_HERE',
  autocompleteFields: ['address1_line1'],

  // When a value for any autocomplete field above is selected,
  // We'll use the results from the last autocomplete to fill in
  // other fields.
  //
  // This block configures how values in the azureGetSearchAddress.Result object
  // will be mapped to form values in Xrm
  //
  // Example address object:
  //    "address": {
  //      "streetNumber": "15127",
  //      "streetName": "NE 24th St",
  //      "municipalitySubdivision": "Redmond",
  //      "municipality": "Redmond, Adelaide, Ames Lake, Avondale, Earlmount",
  //      "countrySecondarySubdivision": "King",
  //      "countryTertiarySubdivision": "Seattle East",
  //      "countrySubdivision": "WA",
  //      "postalCode": "98052",
  //      "extendedPostalCode": "980525544",
  //      "countryCode": "US",
  //      "country": "United States Of America",
  //      "countryCodeISO3": "USA",
  //      "freeformAddress": "15127 NE 24th St, Redmond, WA 980525544",
  //      "countrySubdivisionName": "Washington"
  //    }
  responseMapping: {
    // Dynamics field to update => string|function to autofill on select
    'address1_line1': (address) => { return `${address.streetNumber} ${address.streetName.split(',')[0]}` },
    'address1_city': (address) => { return `${address.municipality.split(',')[0]}` },
    'address1_stateorprovince': 'countrySubdivision',
    'address1_country': 'countryCodeISO3'
  }
};

export default config;