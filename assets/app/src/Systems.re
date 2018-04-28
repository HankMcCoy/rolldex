type system = {
  id: int,
  name: string,
};

type state = {
  systems: list(system),
  loaded: bool,
};

type action =
  | LoadSystems
  | LoadSystemsSuccess(list(system));

let decodeSystem = json : system => {
  Json.Decode.{
    id: json |> field("id", int),
    name: json |> field("name", string),
  }
};

let decodeSystems = json : list(system) => {
  Json.Decode.list(decodeSystem, json)
};

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("Systems");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = (_children) => {
  ...component,

  initialState: () => {systems: [], loaded: false},

  reducer: (action, state) =>
    switch (action) {
    | LoadSystems => ReasonReact.SideEffects(self => {
      Js.Promise.(
        Fetch.fetch("/api/systems")
        |> then_(Fetch.Response.json)
        |> then_(json => Json.Decode.field("data", decodeSystems, json) |> resolve)
        |> then_(systems => {
          self.send(LoadSystemsSuccess(systems));
          resolve()
        })
      ) |> ignore;
      ();
    })
    | LoadSystemsSuccess(systems) => ReasonReact.Update({systems: systems, loaded: true})
    },

  render: ({ state: { loaded, systems }}) => {
    <div>
      (
        loaded ?
          <ul>
            (
              systems
              |> List.map(system => 
                <li key={string_of_int(system.id)}>
                  (ReasonReact.string(system.name))
                </li>)
              |> Array.of_list
              |> ReasonReact.arrayToElement
            )
          </ul> :
          ReasonReact.string("Loading...")
      )
    </div>;
  },

  didMount: self => self.send(LoadSystems)
};
