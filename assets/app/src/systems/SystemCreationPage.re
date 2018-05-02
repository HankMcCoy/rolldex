let component = ReasonReact.statelessComponent("SystemCreationPage");

let make = _children => {
  ...component,
  render: _self => <PageContent> (ReasonReact.string("Add a system")) </PageContent>,
};
