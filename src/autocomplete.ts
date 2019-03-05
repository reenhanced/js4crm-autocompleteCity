import { config } from './config';
/// <reference path="../types/application.d.ts" />

export class AutoComplete {
  private subscription_key: string;
  private format: string = 'json';

  private _lastAutocomplete: Array<azureMapsGetSearchAddress.Result>;

  constructor() {
    this.subscription_key = config.azureMapsSubscriptionKey;
    this._lastAutocomplete = [];
  }

  async autocomplete(query: string): Promise<Xrm.Controls.AutoCompleteResult[]> {
    const response = await fetch(`https://atlas.microsoft.com/search/address/${this.format}?subscription-key=${this.subscription_key}&typeahead=true&api-version=1.0&query=${query}`);
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

  select(id: string|number): azureMapsGetSearchAddress.Result | undefined {
    const match = this._lastAutocomplete.find((res: azureMapsGetSearchAddress.Result) => res.id === id);

    if (match) {
      return match;
    } else {
      return undefined;
    }
  }

}

const autoCompleteInstance = new AutoComplete();

export var search = function(query: string): Promise<Xrm.Controls.AutoCompleteResult[]> {
  return autoCompleteInstance.autocomplete(query);
};

export var select = function(id: string|number) {
  return autoCompleteInstance.select(id);
}