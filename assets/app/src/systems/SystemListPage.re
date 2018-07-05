open Util;

let component = ReasonReact.statelessComponent("SystemListPage");

let make = (~domainData: DomainData.domainDataState, _children) => {
  ...component,
  render: _self =>
    switch (System.listAll(domainData.systems)) {
    | Some(systems) =>
      <div>
        <PageHeader
          title="Systems" breadcrumbs=[] background=Color.SystemsBlue>
          <AddButton
            size=Large
            fgColor=Color.SystemsBlue
            bgColor=Color.White
            href="/systems/add"
          />
        </PageHeader>
        <PageContent>
          <ul style=(style(~maxWidth="400px", ()))>
            (
              systems
              |> List.map((system: System.system) =>
                   <li
                     key=(string_of_int(system.id))
                     style=(style(~marginBottom="10px", ()))>
                     <PreviewCard
                       href=("/systems/" ++ string_of_int(system.id))
                       title=system.name
                       description=system.description
                     />
                   </li>
                 )
              |> Array.of_list
              |> ReasonReact.array
            )
          </ul>
          <Spacer height="20px" />
        </PageContent>
      </div>
    | None => s("Loading...")
    },
};