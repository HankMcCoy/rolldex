open Util;

let component = ReasonReact.statelessComponent("CampaignCreationPage");

let make = (~systems, _children) => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title="Add campaign"
        breadcrumbs=[{text: "Campaigns", href: "/systems"}]
        background=Color.CampaignsPeriwinkle
      />
      <PageContent> <AddCampaignForm systems /> </PageContent>
    </div>,
};
