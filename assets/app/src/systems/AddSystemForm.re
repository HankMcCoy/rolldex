open Util;

type state = {
  name: string,
  description: string,
};

type action =
  | ChangeName(string)
  | ChangeDescription(string);

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("AddSystemForm");

let buttonStyle =
  style(
    ~height="34px",
    ~display="flex",
    ~justifyContent="center",
    ~alignItems="center",
    ~borderRadius="3px",
    ~width="100px",
    ~fontSize="18px",
    ~padding="0",
    ~cursor="pointer",
    (),
  );

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = (~dispatch, _children) => {
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
            dispatch(
              App.SystemAction(System.CreateSystem({name, description})),
            );
            ();
          }
        ),
      )
    | AddSystemSuccess(_addedSystem) =>
      ReasonReact.SideEffects((_self => ReasonReact.Router.push("/systems")))
    },
  render: ({send, state: {name, description}}) =>
    <div style=(style(~maxWidth="400px", ()))>
      <div>
        <label>
          <Heading l=2> (s("Name")) </Heading>
          <Spacer height="15px" />
          <input
            style=(
              style(
                ~height="34px",
                ~width="260px",
                ~padding="0 10px",
                ~fontSize="16px",
                ~fontWeight="300",
                ~fontFamily="Roboto",
                (),
              )
            )
            value=name
            onChange=(event => send(ChangeName(getTarget(event)##value)))
          />
        </label>
      </div>
      <Spacer height="25px" />
      <div>
        <label>
          <Heading l=2> (s("Description")) </Heading>
          <Spacer height="15px" />
          <textarea
            style=(
              style(
                ~minHeight="170px",
                ~width="100%",
                ~fontFamily="Roboto",
                ~fontSize="16px",
                ~fontWeight="300",
                ~padding="10px",
                (),
              )
            )
            value=description
            onChange=(
              event => send(ChangeDescription(getTarget(event)##value))
            )
          />
        </label>
      </div>
      <Spacer height="20px" />
      <div style=(style(~display="flex", ~justifyContent="flex-end", ()))>
        <Link
          href="/systems"
          style=(
            combineStyles(
              buttonStyle,
              style(~background="#fff", ~border="1px solid #ddd", ()),
            )
          )>
          (s("Cancel"))
        </Link>
        <Spacer width="10px" />
        <button
          style=(
            combineStyles(
              buttonStyle,
              style(~border="none", ~background="#3BA170", ~color="#fff", ()),
            )
          )
          onClick=(_event => send(AddSystem))>
          (s("Create"))
        </button>
      </div>
    </div>,
};