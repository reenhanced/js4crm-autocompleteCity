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
  console.log(`OnChange`);
  console.log(ext);

  const attr = ext.getEventSource() as Xrm.Attributes.Attribute;
  const selected = attr.getValue(); // Not yet set!

  console.log(attr);
  console.log(selected);

  const autocompleteResult: any = lastResults.find((res: Xrm.Controls.AutoCompleteResult) => res.fields[0] === selected);

  if (autocompleteResult == undefined) {
    console.log(`no match for ${selected}`);
    return;
  }

  console.log("lastresults", lastResults);
  console.log(`Selected result`, autocompleteResult);

  const azureResult: any = select(autocompleteResult.id);
  console.log(`azure Result:`, azureResult);

  if (azureResult == undefined) {
    console.log(`no match for ${autocompleteResult.id}`);
    return;
  }

  for (let dynamicsAttribute in config.responseMapping) {
    let value: string;

    const attrib = Xrm.Page.getAttribute(dynamicsAttribute);
    const mapping = config.responseMapping[dynamicsAttribute];

    if (typeof(mapping) == 'function') {
      value = mapping(azureResult.address);
    } else {
      value = azureResult.address[mapping];
    }
    console.log(`Setting `, dynamicsAttribute, ` to `, value);
    attrib.setValue(value);
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