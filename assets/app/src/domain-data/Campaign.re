open Util;

/* Storage types */

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

module Api = {
  /* Encoding/decoding */
  let decodeCampaign = json : campaign =>
    Json.Decode.{
      id: json |> field("id", int),
      name: json |> field("name", string),
      description: json |> field("description", string),
      system_id: json |> field("system_id", int),
    };

  let decodeCampaigns = json : list(campaign) =>
    Json.Decode.list(decodeCampaign, json);

  let encodeString = (key, value, dict) => {
    Js.Dict.set(dict, key, Js.Json.string(value));
    dict;
  };

  let encodeInt = (key, value, dict) => {
    Js.Dict.set(dict, key, Js.Json.number(float_of_int(value)));
    dict;
  };

  let encodeDraftCampaign = (draftCampaign: draftCampaign) =>
    Js.Dict.empty()
    |> encodeString("name", draftCampaign.name)
    |> encodeString("description", draftCampaign.description)
    |> encodeInt("system_id", draftCampaign.system_id);

  let encodeCampaign = campaign =>
    Js.Dict.empty()
    |> encodeInt("id", campaign.id)
    |> encodeString("name", campaign.name)
    |> encodeString("description", campaign.description)
    |> encodeInt("system_id", campaign.system_id);

  /* API fetching */

  let getCampaigns = () =>
    JsonApi.get(~url="/api/campaigns", ~decode=decodeCampaigns);

  let createCampaign = (draftCampaign: draftCampaign) => {
    let campaignDict = encodeDraftCampaign(draftCampaign);
    let payload = Js.Dict.empty();
    Js.Dict.set(payload, "campaign", Js.Json.object_(campaignDict));
    JsonApi.post(~url="/api/campaigns", ~payload, ~decode=decodeCampaign);
  };

  let updateCampaign = campaign => {
    let campaignDict = encodeCampaign(campaign);
    let payload = Js.Dict.empty();
    Js.Dict.set(payload, "campaign", Js.Json.object_(campaignDict));
    JsonApi.put(~url="/api/campaigns", ~payload, ~decode=decodeCampaign);
  };
};

/* Action types */
type campaignAction =
  | GetCampaigns
  | GetCampaignsSuccess(list(campaign))
  | CreateCampaign(draftCampaign)
  | CreateCampaignSuccess(campaign);

/* State */

type state = option(Belt.Map.Int.t(campaign));
let initialState: state = None;

/* Reducer */

let reducer = (action, state) =>
  switch (action) {
  | GetCampaigns =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            Api.getCampaigns()
            |> then_(campaigns => {
                 self.send(GetCampaignsSuccess(campaigns));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | GetCampaignsSuccess(campaigns) =>
    ReasonReact.Update(
      campaigns
      |> Array.of_list
      |> Array.map(c => (c.id, c))
      |> Belt.Map.Int.fromArray,
    )
  | CreateCampaign(draftCampaign) =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            Api.createCampaign(draftCampaign)
            |> then_(campaign => {
                 self.send(CreateCampaignSuccess(campaign));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | CreateCampaignSuccess(campaign) =>
    ReasonReact.Update(Belt.Map.Int.set(state, campaign.id, campaign))
  };