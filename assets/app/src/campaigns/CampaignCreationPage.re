open Util;

let component = ReasonReact.statelessComponent("CampaignCreationPage");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title="Add campaign"
        breadcrumbs=[{text: "Campaigns", href: "/systems"}]
        background=Color.CampaignsPeriwinkle
      />
      <PageContent> <AddCampaignForm /> </PageContent>
    </div>,
};
