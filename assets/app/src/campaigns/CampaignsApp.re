open Util;

type route =
  | Loading
  | ListAllCampaigns
  | ViewOneCampaign(int)
  | CreateCampaign
  | ViewOneSession(int, int)
  | CreateSession(int);

type state = {route};

type action =
  | ChangeRoute(route);

let reducer = (action, _state) =>
  switch (action) {
  | ChangeRoute(ViewOneCampaign(campaignId)) =>
    ReasonReact.UpdateWithSideEffects(
      {route: ViewOneCampaign(campaignId)},
      (_self => Js.log("Fetch sessions")),
    )
  | ChangeRoute(route) => ReasonReact.Update({route: route})
  };

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | ["campaigns", campaignId, "sessions", "add"] =>
    CreateSession(int_of_string(campaignId))
  | ["campaigns", campaignId, "sessions", sessionId] =>
    ViewOneSession(int_of_string(campaignId), int_of_string(sessionId))
  | ["campaigns", "add"] => CreateCampaign
  | ["campaigns", campaignId] => ViewOneCampaign(int_of_string(campaignId))
  | ["campaigns"] => ListAllCampaigns
  | _ => CreateCampaign
  };

let component = ReasonReact.reducerComponent("CampaignsApp");

let make = (~campaigns, ~systems, _children) => {
  ...component,
  initialState: () => {route: Loading},
  reducer,
  didMount: self =>
    self.send(
      ChangeRoute(
        mapUrlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
      ),
    ),
  subscriptions: self => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(url =>
          self.send(ChangeRoute(url |> mapUrlToRoute))
        ),
      ReasonReact.Router.unwatchUrl,
    ),
  ],
  render: ({state: {route}}) =>
    switch (route) {
    | Loading => s("Loading...")
    | CreateSession(campaignId) =>
      <SessionCreationPage
        campaign=(
          List.find(
            (c: CampaignData.campaign) => c.id == campaignId,
            campaigns,
          )
        )
      />
    | ViewOneSession(_campaignId, _sessionId) => <SessionDetailPage />
    | ListAllCampaigns => <CampaignListPage campaigns systems />
    | ViewOneCampaign(id) =>
      <CampaignDetailsPage
        campaign=(
          List.find((c: CampaignData.campaign) => c.id === id, campaigns)
        )
      />
    | CreateCampaign => <CampaignCreationPage systems />
    },
};
