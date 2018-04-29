type draftSystem = {name: string};

type system = {
  id: int,
  name: string,
};

let decodeSystem = json : system =>
  Json.Decode.{
    id: json |> field("id", int),
    name: json |> field("name", string),
  };

let decodeSystems = json : list(system) =>
  Json.Decode.list(decodeSystem, json);

let getSystems = () =>
  Js.Promise.(
    Fetch.fetch("/api/systems")
    |> then_(Fetch.Response.json)
    |> then_(json =>
         Json.Decode.field("data", decodeSystems, json) |> resolve
       )
  );

let createSystem = (draftSystem: draftSystem) => {
  let systemDict = Js.Dict.empty();
  Js.Dict.set(systemDict, "name", Js.Json.string(draftSystem.name));
  let payload = Js.Dict.empty();
  Js.Dict.set(payload, "system", Js.Json.object_(systemDict));
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/systems",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~body=
          Fetch.BodyInit.make(Js.Json.stringify(Js.Json.object_(payload))),
        ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
        (),
      ),
    )
    |> then_(Fetch.Response.json)
    |> then_(json => Json.Decode.field("data", decodeSystem, json) |> resolve)
  );
};
