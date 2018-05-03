type draftCampaign = {
  name: string,
  description: string,
  system_id: int,
};

type campaign = {
  id: int,
  name: string,
  description: string,
  system_id: int,
};

let decodeCampaign = json : campaign =>
  Json.Decode.{
    id: json |> field("id", int),
    name: json |> field("name", string),
    description: json |> field("description", string),
    system_id: json |> field("system_id", int),
  };

let decodeCampaigns = json : list(campaign) =>
  Json.Decode.list(decodeCampaign, json);

let getCampaigns = () =>
  Js.Promise.(
    Fetch.fetch("/api/campaigns")
    |> then_(Fetch.Response.json)
    |> then_(json =>
         Json.Decode.field("data", decodeCampaigns, json) |> resolve
       )
  );

let createCampaign = (draftCampaign: draftCampaign) => {
  let campaignDict = Js.Dict.empty();
  Js.Dict.set(campaignDict, "name", Js.Json.string(draftCampaign.name));
  Js.Dict.set(
    campaignDict,
    "description",
    Js.Json.string(draftCampaign.description),
  );
  Js.Dict.set(
    campaignDict,
    "system_id",
    Js.Json.number(float_of_int(draftCampaign.system_id)),
  );
  let payload = Js.Dict.empty();
  Js.Dict.set(payload, "campaign", Js.Json.object_(campaignDict));
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/campaigns",
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
         Json.Decode.field("data", decodeCampaign, json) |> resolve
       )
  );
};
