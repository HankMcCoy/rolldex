let component = ReasonReact.statelessComponent("CampaignsApp");

let make = _children => {
  ...component,
  render: _self =>
    <PageContent>
      <Heading l=1> (ReasonReact.string("Campaigns")) </Heading>
    </PageContent>,
};
