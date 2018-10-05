import { config, responseMapping }  from './config';
import { search, select } from './autocomplete';

/// <reference types="xrm" />

var lastResults: Xrm.Controls.AutoCompleteResult[] = [];

var OnKeypress = function(ext: Xrm.Events.EventContext) {
  const control = ext.getEventSource() as Xrm.Controls.AutoLookupControl;
  const query   = control.getValue();

  let resultSet: Xrm.Controls.AutoCompleteResultSet = { results: [] };

  if (query.length >= 2) {
    search(query).then((results) => {
      resultSet.results = results;
      lastResults = results;

      control.showAutoComplete(resultSet);
    })
  }
};

var OnSelect = function(ext: Xrm.Events.EventContext) {
  console.log(`OnChange(${ext})`);
  console.log(ext);

  const attr = ext.getEventSource() as Xrm.Attributes.Attribute;
  const selected = attr.getValue();

  const result = lastResults.find((res: Xrm.Controls.AutoCompleteResult) => res.fields[0] === selected);

  console.log(`Selected result ${result}`);

  for (let dynamicsAttribute in config.responseMapping) {
    const attrib = Xrm.Page.getAttribute(dynamicsAttribute);
    const mapping = config.responseMapping[dynamicsAttribute];

    let value: string;
    
    if (result !== undefined) {
      const autocompleteResult = select(result.id);
      console.log(`Autocomplete Result: ${autocompleteResult}`);

      if (autocompleteResult) {
        if (typeof(mapping) == 'function') {
          value = mapping(autocompleteResult);
        } else {
          value = autocompleteResult[mapping];
        }
        console.log(`Setting ${dynamicsAttribute} to ${value}`);
        attrib.setValue(value);
      }
    }
  }

};

export function OnLoad() {
  // Locate Xrm fields for cities
  const fields: string[] = config.autocompleteFields;

  fields.forEach(fieldName => {
    let autolookupControl = Xrm.Page.getControl<Xrm.Controls.AutoLookupControl>(fieldName);
    let autolookupAttribute = Xrm.Page.getAttribute(fieldName);

    // Enable autocomplete
    autolookupControl.addOnKeyPress(OnKeypress);

    // After selection, populate city details into mapped fields
    autolookupAttribute.addOnChange(OnSelect);
  });
}