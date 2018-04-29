let component = ReasonReact.statelessComponent("CampaignsApp");

let make = _children => {
  ...component,
  render: _self => <Page> (ReasonReact.string("Campaigns")) </Page>,
};
