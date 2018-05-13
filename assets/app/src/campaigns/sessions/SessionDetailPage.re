open Util;

let component = ReasonReact.statelessComponent("SessionDetailsPage");

let session: SessionData.session = {
  id: 12,
  name: "Good session",
  summary: "It was good",
  notes: "I DON'T KNOW WHAT YOU WANT FROM ME",
  campaign_id: 1,
};

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title=session.name
        breadcrumbs=[{text: "Sessions", href: "/sessions"}]
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
