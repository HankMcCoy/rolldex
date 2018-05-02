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
      <PageContent> <p> (s(system.description)) </p> </PageContent>
    </div>,
};
