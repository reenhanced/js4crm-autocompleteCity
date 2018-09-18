export default class Config {
  config = {
    cityFields: ['address1_city'],

    // When a value for the autocomplete above is selected,
    // We'll send out another json request to get details on the
    // selected city.
    //
    // When that response comes back, this block configures
    // how values in the response object will be mapped to form values
    // in Xrm
    responseMapping: {
      // JSON RESPONSE => Dynamics field to update
      'geobytescity': 'address1_city',
      'geobytesregion': 'address1_stateorprovince',
      'geobytescountry': 'address1_country'
    }
  };
}