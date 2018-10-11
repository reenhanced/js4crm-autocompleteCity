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
  // This block configures how values in the azureSearchAddress object
  // will be mapped to form values in Xrm
  responseMapping: {
    // Dynamics field to update => string|function to autofill on select
    'address1_line1': (address) => { return `${address.streetNumber} ${address.streetName.split(',')[0]}` },
    'address1_city': (address) => { return `${address.municipality.split(',')[0]}` },
    'address1_stateorprovince': 'countrySubdivision',
    'address1_country': 'countryCodeISO3'
  }
};

export default config;