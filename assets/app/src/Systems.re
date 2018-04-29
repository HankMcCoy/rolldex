type state = {
  systems: list(SystemData.system),
  loaded: bool,
};

type action =
  | LoadSystems
  | LoadSystemsSuccess(list(SystemData.system));

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("Systems");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
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
    <div>
      (
        loaded ?
          <ul>
            (
              systems
              |> List.map((system: SystemData.system) =>
                   <li key=(string_of_int(system.id))>
                     (ReasonReact.string(system.name))
                   </li>
                 )
              |> Array.of_list
              |> ReasonReact.array
            )
          </ul> :
          ReasonReact.string("Loading...")
      )
      <AddSystemForm />
    </div>,
  didMount: self => self.send(LoadSystems),
};
