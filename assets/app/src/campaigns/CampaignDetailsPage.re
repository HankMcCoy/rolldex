open Util;

let component = ReasonReact.statelessComponent("CampaignDetailsPage");

let make = (~campaign: CampaignData.campaign, _children) => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title=campaign.name
        breadcrumbs=[{text: "Campaigns", href: "/campaigns"}]
        background=Color.CampaignsPeriwinkle
      />
      <div
        style=(style(~display="flex", ~justifyContent="space-between", ()))>
        <PageContent>
          <div style=(style(~maxWidth="500px", ()))>
            <Heading l=2> (s("Description")) </Heading>
            <Spacer height="12px" />
            <Para text=campaign.description />
          </div>
        </PageContent>
        <PageSidebar subApp=CampaignsSubApp />
      </div>
    </div>,
};
