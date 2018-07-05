open Util;

/* Storage types */

type draftSystem = {
  name: string,
  description: string,
};

type system = {
  id: int,
  name: string,
  description: string,
};

module Api = {
  /* Encoding/decoding */
  let decodeSystem = json : system =>
    Json.Decode.{
      id: json |> field("id", int),
      name: json |> field("name", string),
      description: json |> field("description", string),
    };

  let decodeSystems = json : list(system) =>
    Json.Decode.list(decodeSystem, json);

  let encodeString = (key, value, dict) => {
    Js.Dict.set(dict, key, Js.Json.string(value));
    dict;
  };

  let encodeInt = (key, value, dict) => {
    Js.Dict.set(dict, key, Js.Json.number(float_of_int(value)));
    dict;
  };

  let encodeDraftSystem = (draftSystem: draftSystem) =>
    Js.Dict.empty()
    |> encodeString("name", draftSystem.name)
    |> encodeString("description", draftSystem.description);

  let encodeSystem = system =>
    Js.Dict.empty()
    |> encodeInt("id", system.id)
    |> encodeString("name", system.name)
    |> encodeString("description", system.description);

  /* API fetching */

  let getSystems = () =>
    JsonApi.get(~url="/api/systems", ~decode=decodeSystems);

  let createSystem = (draftSystem: draftSystem) => {
    let systemDict = encodeDraftSystem(draftSystem);
    let payload = Js.Dict.empty();
    Js.Dict.set(payload, "system", Js.Json.object_(systemDict));
    JsonApi.post(~url="/api/systems", ~payload, ~decode=decodeSystem);
  };

  let updateSystem = system => {
    let systemDict = encodeSystem(system);
    let payload = Js.Dict.empty();
    Js.Dict.set(payload, "system", Js.Json.object_(systemDict));
    JsonApi.put(~url="/api/systems", ~payload, ~decode=decodeSystem);
  };
};

/* Action types */
type systemAction =
  | GetSystems
  | GetSystemsSuccess(list(system))
  | CreateSystem(draftSystem)
  | CreateSystemSuccess(system);

/* State */

type state = option(Belt.Map.Int.t(system));
let initialState: state = None;

/* Selectors */

let listAll = (state: state) =>
  switch (state) {
  | Some(systems) =>
    Some(systems |> Belt.Map.Int.valuesToArray |> Array.to_list)
  | None => None
  };

let getOne = (state: state, id) =>
  switch (state) {
  | Some(systems) => Some(systems |. Belt.Map.Int.get(id))
  | None => None
  };

/* Reducer */

let reducer =
    (action, state: state)
    : ReasonReact.update(state, ReasonReact.noRetainedProps, systemAction) =>
  switch (action) {
  | GetSystems =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            Api.getSystems()
            |> then_(systems => {
                 self.send(GetSystemsSuccess(systems));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | GetSystemsSuccess(systems) =>
    ReasonReact.Update(
      Some(
        systems
        |> Array.of_list
        |> Array.map(c => (c.id, c))
        |> Belt.Map.Int.fromArray,
      ),
    )
  | CreateSystem(draftSystem) =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            Api.createSystem(draftSystem)
            |> then_(system => {
                 self.send(CreateSystemSuccess(system));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | CreateSystemSuccess(system) =>
    let systemMap =
      switch (state) {
      | Some(systems) => systems
      | None => Belt.Map.Int.empty
      };
    ReasonReact.Update(
      Some(Belt.Map.Int.set(systemMap, system.id, system)),
    );
  };