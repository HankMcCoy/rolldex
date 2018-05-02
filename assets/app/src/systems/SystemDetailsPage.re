open Util;

let component = ReasonReact.statelessComponent("Systempage");

let make = (~system: SystemData.system, _children) => {
  ...component,
  render: _self =>
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
    </div>,
};
