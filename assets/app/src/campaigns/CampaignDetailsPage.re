open Util;

let component = ReasonReact.statelessComponent("CampaignDetailsPage");

let make =
    (
      ~sessions: option(list(SessionData.session)),
      ~campaign: CampaignData.campaign,
      _children,
    ) => {
  ...component,
  render: _self => {
    let id = campaign.id;
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
            <Spacer height="12px" />
            <div
              style=(
                style(
                  ~display="flex",
                  ~alignItems="center",
                  ~justifyContent="space-between",
                  (),
                )
              )>
              <Heading l=2> (s("Sessions")) </Heading>
              <AddButton
                size=Medium
                fgColor=Color.White
                bgColor=Color.CampaignsPeriwinkle
                href={j|/campaigns/$id/sessions/add|j}
              />
            </div>
            <ul style=(style(~maxWidth="400px", ()))>
              (
                switch (sessions) {
                | Some(sessions) =>
                  sessions
                  |> List.map((session: SessionData.session) =>
                       <li
                         key=(string_of_int(session.id))
                         style=(style(~marginBottom="10px", ()))>
                         <PreviewCard
                           href=(
                             "/campaigns/"
                             ++ string_of_int(campaign.id)
                             ++ "/sessions/"
                             ++ string_of_int(session.id)
                           )
                           title=session.name
                           description=session.summary
                         />
                       </li>
                     )
                  |> Array.of_list
                  |> ReasonReact.array
                | None => s("Loading...")
                }
              )
            </ul>
          </div>
        </PageContent>
        <PageSidebar subApp=CampaignsSubApp />
      </div>
    </div>;
  },
};
