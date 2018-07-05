open Util;

let component = ReasonReact.statelessComponent("SystemDetailsPage");

let make = (~domainData: DomainData.domainDataState, ~id, _children) => {
  ...component,
  render: _self =>
    switch (System.getOne(domainData.systems, id)) {
    | Some(system) =>
      <div>
        <PageHeader
          title=system.name
          breadcrumbs=[{text: "Systems", href: "/systems"}]
          background=Color.SystemsBlue
        />
        <div
          style=(style(~display="flex", ~justifyContent="space-between", ()))>
          <PageContent>
            <div style=(style(~maxWidth="500px", ()))>
              <Heading l=2> (s("Description")) </Heading>
              <Spacer height="12px" />
              <Para text=system.description />
            </div>
          </PageContent>
          <PageSidebar subApp=SystemsSubApp />
        </div>
      </div>
    | None => s("Loading...")
    },
};