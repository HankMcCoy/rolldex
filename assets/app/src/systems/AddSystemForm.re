open Util;

type state = {name: string};

type action =
  | ChangeName(string)
  | AddSystem
  | AddSystemSuccess(SystemData.system);

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("AddSystemForm");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = _children => {
  ...component,
  initialState: () => {name: ""},
  reducer: (action, state) =>
    switch (action) {
    | ChangeName(name) => ReasonReact.Update({name: name})
    | AddSystem =>
      ReasonReact.SideEffects(
        (
          self => {
            Js.Promise.(
              SystemData.createSystem({name: state.name})
              |> then_(system =>
                   self.send(AddSystemSuccess(system)) |> resolve
                 )
              |> ignore
            );
            ();
          }
        ),
      )
    | AddSystemSuccess(_addedSystem) => ReasonReact.Update({name: ""})
    },
  render: ({send, state: {name}}) =>
    <div>
      <label>
        (ReasonReact.string("Name: "))
        <input
          value=name
          onChange=(event => send(ChangeName(getTarget(event)##value)))
        />
      </label>
      <button onClick=(_event => send(AddSystem))>
        (ReasonReact.string("Add"))
      </button>
    </div>,
};
