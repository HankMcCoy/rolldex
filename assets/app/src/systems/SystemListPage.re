open Util;

let component = ReasonReact.statelessComponent("SystemListPage");

let make = (~systems: list(SystemData.system), _children) => {
  ...component,
  render: _self =>
    <Page>
      <h1 style=(style(~fontSize="48px", ()))> (s("Systems")) </h1>
      <Spacer height="20px" />
      <ul>
        (
          systems
          |> List.map((system: SystemData.system) =>
               <li key=(string_of_int(system.id))>
                 <Link href=("/systems/" ++ string_of_int(system.id))>
                   (ReasonReact.string(system.name))
                 </Link>
               </li>
             )
          |> Array.of_list
          |> ReasonReact.array
        )
      </ul>
      <Spacer height="20px" />
      <AddSystemForm />
    </Page>,
};
