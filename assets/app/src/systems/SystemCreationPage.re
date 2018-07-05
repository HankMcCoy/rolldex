open Util;

let component = ReasonReact.statelessComponent("SystemCreationPage");

let make = (~dispatch, _children) => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title="Add system"
        breadcrumbs=[{text: "Systems", href: "/systems"}]
        background=Color.SystemsBlue
      />
      <PageContent> <AddSystemForm dispatch /> </PageContent>
    </div>,
};