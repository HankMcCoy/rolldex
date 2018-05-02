let component = ReasonReact.statelessComponent("HomePage");

let make = _children => {
  ...component,
  render: _self =>
    <PageContent> <Heading l=1> (ReasonReact.string("Home")) </Heading> </PageContent>,
};
