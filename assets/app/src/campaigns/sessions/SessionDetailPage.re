open Util;

let component = ReasonReact.statelessComponent("SessionDetailsPage");

let make =
    (
      ~session: SessionData.session,
      ~campaign: CampaignData.campaign,
      _children,
    ) => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title=session.name
        breadcrumbs=[
          {text: "Campaigns", href: "/campaigns"},
          {
            text: campaign.name,
            href: "/campaigns/" ++ string_of_int(campaign.id),
          },
        ]
        background=Color.CampaignsPeriwinkle
      />
      <div
        style=(style(~display="flex", ~justifyContent="space-between", ()))>
        <PageContent>
          <div style=(style(~maxWidth="500px", ()))>
            <Heading l=2> (s("Summary")) </Heading>
            <Spacer height="12px" />
            <Para text=session.summary />
            <Spacer height="12px" />
            <Heading l=2> (s("Notes")) </Heading>
            <Spacer height="12px" />
            <Para text=session.notes />
            <Spacer height="12px" />
          </div>
        </PageContent>
        <PageSidebar subApp=CampaignsSubApp />
      </div>
    </div>,
};
