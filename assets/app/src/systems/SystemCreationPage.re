let component = ReasonReact.statelessComponent("SystemCreationPage");

let make = _children => {
  ...component,
  render: _self => <Page> (ReasonReact.string("Add a system")) </Page>,
};
