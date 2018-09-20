import config from './config';
import { search } from './autocomplete';

var OnKeypress = function(ext: Xrm.Events.EventContext) {
  const control = ext.getEventSource() as Xrm.Controls.AutoLookupControl;
  const query   = control.getValue();

  let resultSet: Xrm.Controls.AutoCompleteResultSet = { results: [] };

  if (query.length >= 3) {
    search(query).then((response) => {
      console.log(response);
    })
  }


  control.showAutoComplete(resultSet)
};

export function OnLoad() {
  // Locate Xrm fields for cities
  const fields: string[] = config.cityFields;

  fields.forEach(fieldName => {
    let autolookupControl = Xrm.Page.getControl<Xrm.Controls.AutoLookupControl>(fieldName);

    autolookupControl.addOnKeyPress(OnKeypress);
  });
  // Enable autocomplete
  // After selection, populate city details into mapped fields
}