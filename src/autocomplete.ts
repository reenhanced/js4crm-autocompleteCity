import config from './config';

export class AutoComplete {
  private subscription_key: string;
  private format: string = 'json';

  private _lastAutocomplete: any;

  constructor() {
    this.subscription_key = config.azureSubscriptionKey;
    this._lastAutocomplete = [];
  }

  async autocomplete(query: string): Promise<Xrm.Controls.AutoCompleteResult[]> {
    const response = await fetch(`https://atlas.microsoft.com/search/address/${this.format}?subscription-key=${this.subscription_key}&typeahead=true&countrySet=US&api-version=1.0&query=${query}`);
    const json = await response.json();
    const results: Xrm.Controls.AutoCompleteResult[] = [];

    if (json.summary && json.summary.numResults > 0) {
      this._lastAutocomplete = json.results;

      this._lastAutocomplete.forEach((result: any) => {
        results.push({id: result.id, fields: [result.address.freeformAddress]});
      });
    }

    return results;
  }

  select(id: string) {
    return this._lastAutocomplete.find((res: any) => res.id === id);
  }

}

const autoCompleteInstance = new AutoComplete();

export var search = function(query: string): Promise<Xrm.Controls.AutoCompleteResult[]> {
  return autoCompleteInstance.autocomplete(query);
};