open Util;

let component = ReasonReact.statelessComponent("SystemCreationPage");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title="Add system"
        breadcrumbs=[{text: "Systems", href: "/systems"}]
        background=Color.SystemsBlue
      />
      <PageContent> <AddSystemForm /> </PageContent>
    </div>,
};
