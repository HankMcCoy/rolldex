let component = ReasonReact.statelessComponent("CampaignsApp");

let make = _children => {
  ...component,
  render: _self =>
    <Page> <Heading l=1> (ReasonReact.string("Campaigns")) </Heading> </Page>,
};
