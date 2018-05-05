open Util;

type state = {
  name: string,
  description: string,
  system_id: option(int),
};

type action =
  | ChangeName(string)
  | ChangeDescription(string)
  | ChangeSystem(option(int))
  | AddCampaign
  | AddCampaignSuccess(CampaignData.campaign);

let component = ReasonReact.reducerComponent("AddCampaignForm");

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

exception CannotAddCampaign;

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = (~systems: list(SystemData.system), _children) => {
  ...component,
  initialState: () => {name: "", description: "", system_id: None},
  reducer: (action, state) =>
    switch (action) {
    | ChangeName(name) => ReasonReact.Update({...state, name})
    | ChangeDescription(description) =>
      ReasonReact.Update({...state, description})
    | ChangeSystem(system_id) => ReasonReact.Update({...state, system_id})
    | AddCampaign =>
      switch (state.system_id) {
      | None => raise(CannotAddCampaign)
      | Some(system_id) =>
        ReasonReact.SideEffects(
          (
            self => {
              Js.Promise.(
                CampaignData.createCampaign({
                  name: state.name,
                  description: state.description,
                  system_id,
                })
                |> then_(campaign =>
                     self.send(AddCampaignSuccess(campaign)) |> resolve
                   )
                |> ignore
              );
              ();
            }
          ),
        )
      }
    | AddCampaignSuccess(_addedCampaign) =>
      ReasonReact.SideEffects(
        (_self => ReasonReact.Router.push("/campaigns")),
      )
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
          <Heading l=2> (s("System")) </Heading>
          <Spacer height="15px" />
          <select
            style=(
              style(
                ~background="#fff",
                ~height="34px",
                ~width="260px",
                ~padding="0 10px",
                ~fontSize="16px",
                ~fontWeight="300",
                ~fontFamily="Roboto",
                (),
              )
            )
            onChange=(
              event => {
                let value = getTarget(event)##value;
                send(
                  switch (value) {
                  | "" => ChangeSystem(None)
                  | value => ChangeSystem(Some(int_of_string(value)))
                  },
                );
              }
            )>
            (
              systems
              |> List.map(({id, name}: SystemData.system) =>
                   <option value=(string_of_int(id))> (s(name)) </option>
                 )
              |> List.append([<option />])
              |> Array.of_list
              |> ReasonReact.array
            )
          </select>
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
          href="/campaigns"
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
          onClick=(_event => send(AddCampaign))>
          (s("Create"))
        </button>
      </div>
    </div>,
};
