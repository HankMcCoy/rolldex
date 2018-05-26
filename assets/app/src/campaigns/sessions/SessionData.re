type draftSession = {
  name: string,
  summary: string,
  notes: string,
  campaign_id: int,
};

type session = {
  id: int,
  name: string,
  summary: string,
  notes: string,
  campaign_id: int,
};

let decodeSession = json : session =>
  Json.Decode.{
    id: json |> field("id", int),
    name: json |> field("name", string),
    summary: json |> field("summary", string),
    notes: json |> field("notes", string),
    campaign_id: json |> field("campaign_id", int),
  };

let decodeSessions = json : list(session) =>
  Json.Decode.list(decodeSession, json);

let getSessions = campaignId =>
  Js.Promise.(
    Fetch.fetch(
      "/api/campaigns/" ++ string_of_int(campaignId) ++ "/sessions",
    )
    |> then_(Fetch.Response.json)
    |> then_(json =>
         Json.Decode.field("data", decodeSessions, json) |> resolve
       )
  );

let createSession = (draftSession: draftSession) => {
  let sessionDict = Js.Dict.empty();
  Js.Dict.set(sessionDict, "name", Js.Json.string(draftSession.name));
  Js.Dict.set(sessionDict, "summary", Js.Json.string(draftSession.summary));
  Js.Dict.set(sessionDict, "notes", Js.Json.string(draftSession.notes));
  Js.Dict.set(
    sessionDict,
    "campaign_id",
    Js.Json.number(float_of_int(draftSession.campaign_id)),
  );
  let payload = Js.Dict.empty();
  Js.Dict.set(payload, "session", Js.Json.object_(sessionDict));
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/campaigns/"
      ++ string_of_int(draftSession.campaign_id)
      ++ "/sessions",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~body=
          Fetch.BodyInit.make(Js.Json.stringify(Js.Json.object_(payload))),
        ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
        (),
      ),
    )
    |> then_(Fetch.Response.json)
    |> then_(json =>
         Json.Decode.field("data", decodeSession, json) |> resolve
       )
  );
};

module SessionMap = Map.Make(Int32);

let getSessionMap = systems =>
  systems
  |> List.fold_left(
       (map, system) =>
         SessionMap.add(Int32.of_int(system.id), system, map),
       SessionMap.empty,
     );
