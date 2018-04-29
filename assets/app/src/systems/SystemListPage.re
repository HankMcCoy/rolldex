open Util;

type state = {
  systems: list(SystemData.system),
  loaded: bool,
};

type action =
  | LoadSystems
  | LoadSystemsSuccess(list(SystemData.system));

let component = ReasonReact.reducerComponent("SystemListPage");

let make = _children => {
  ...component,
  initialState: () => {systems: [], loaded: false},
  reducer: (action, _state) =>
    switch (action) {
    | LoadSystems =>
      ReasonReact.SideEffects(
        (
          self => {
            Js.Promise.(
              SystemData.getSystems()
              |> then_(systems => {
                   self.send(LoadSystemsSuccess(systems));
                   resolve();
                 })
            )
            |> ignore;
            ();
          }
        ),
      )
    | LoadSystemsSuccess(systems) =>
      ReasonReact.Update({systems, loaded: true})
    },
  render: ({state: {loaded, systems}}) =>
    <Page>
      <h1 style=(style(~fontSize="48px", ()))> (s("Systems")) </h1>
      <Spacer height="20px" />
      (
        loaded ?
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
          </ul> :
          ReasonReact.string("Loading...")
      )
      <Spacer height="20px" />
      <AddSystemForm />
    </Page>,
  didMount: self => self.send(LoadSystems),
};
