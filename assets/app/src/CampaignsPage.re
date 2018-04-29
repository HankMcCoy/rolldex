let component = ReasonReact.statelessComponent("CampaignsPage");

let make = _children => {
  ...component,
  render: _self => <div> (ReasonReact.string("Campaigns")) </div>,
};
