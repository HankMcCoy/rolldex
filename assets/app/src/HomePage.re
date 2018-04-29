let component = ReasonReact.statelessComponent("HomePage");

let make = _children => {
  ...component,
  render: _self =>
    <Page> <Heading l=1> (ReasonReact.string("Home")) </Heading> </Page>,
};
