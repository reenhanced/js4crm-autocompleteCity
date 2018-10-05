var config = {
    azureSubscriptionKey: 'gIwMTb0tHeCw45mPZyaYMP0FFo4uYdweQhe1OXqb_cE',
    autocompleteFields: ['address1_street1'],

    // When a value for the autocomplete above is selected,
    // We'll send out another json request to get details on the
    // selected city.
    //
    // When that response comes back, this block configures
    // how values in the response object will be mapped to form values
    // in Xrm
    responseMapping: {
      // Dynamics field name => Address attribute or function to transform address into value
      'address1_street1': (address: any) => { `${address.streetNumber} ${address.streetName}`; },
      'address1_city': 'municipalitySubdivision',
      'address1_stateorprovince': 'countrySubdivision',
      'address1_country': 'countryCodeISO3'
    }
  };

export default config;