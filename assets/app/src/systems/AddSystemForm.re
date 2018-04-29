open Util;

type state = {
  name: string,
  description: string,
};

type action =
  | ChangeName(string)
  | ChangeDescription(string)
  | AddSystem
  | AddSystemSuccess(SystemData.system);

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("AddSystemForm");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = _children => {
  ...component,
  initialState: () => {name: "", description: ""},
  reducer: (action, state) =>
    switch (action) {
    | ChangeName(name) => ReasonReact.Update({...state, name})
    | ChangeDescription(description) =>
      ReasonReact.Update({...state, description})
    | AddSystem =>
      ReasonReact.SideEffects(
        (
          self => {
            Js.Promise.(
              SystemData.createSystem({
                name: state.name,
                description: state.description,
              })
              |> then_(system =>
                   self.send(AddSystemSuccess(system)) |> resolve
                 )
              |> ignore
            );
            ();
          }
        ),
      )
    | AddSystemSuccess(_addedSystem) =>
      ReasonReact.Update({name: "", description: ""})
    },
  render: ({send, state: {name, description}}) =>
    <div>
      <div>
        <label>
          (ReasonReact.string("Name: "))
          <input
            value=name
            onChange=(event => send(ChangeName(getTarget(event)##value)))
          />
        </label>
      </div>
      <div>
        <label>
          (ReasonReact.string("Description: "))
          <input
            value=description
            onChange=(
              event => send(ChangeDescription(getTarget(event)##value))
            )
          />
        </label>
      </div>
      <button onClick=(_event => send(AddSystem))>
        (ReasonReact.string("Add"))
      </button>
    </div>,
};
