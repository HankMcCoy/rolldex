open Util;

type route =
  | Loading
  | ListAllCampaigns
  | ViewOneCampaign(int)
  | AddCampaign
  | ViewOneSession(int, int)
  | AddSession(int);

type sessionsMap = Belt.Map.Int.t(list(SessionData.session));

type state = {
  route,
  sessionsByCampaign: sessionsMap,
};

type action =
  | ChangeRoute(route)
  | FetchSessions(int)
  | CreateSession(SessionData.draftSession)
  | CreateSessionSuccess(SessionData.session)
  | FetchSessionsSuccess(int, list(SessionData.session));

let reducer = (action, state) =>
  switch (action) {
  | ChangeRoute(ViewOneCampaign(campaignId)) =>
    ReasonReact.UpdateWithSideEffects(
      {...state, route: ViewOneCampaign(campaignId)},
      (self => self.send(FetchSessions(campaignId))),
    )
  | ChangeRoute(ViewOneSession(campaignId, sessionId)) =>
    ReasonReact.UpdateWithSideEffects(
      {...state, route: ViewOneSession(campaignId, sessionId)},
      (self => self.send(FetchSessions(campaignId))),
    )
  | ChangeRoute(route) => ReasonReact.Update({...state, route})
  | FetchSessions(campaignId) =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            SessionData.getSessions(campaignId)
            |> then_(sessions => {
                 self.send(FetchSessionsSuccess(campaignId, sessions));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | FetchSessionsSuccess(campaignId, sessions) =>
    ReasonReact.Update({
      ...state,
      sessionsByCampaign:
        Belt.Map.Int.set(state.sessionsByCampaign, campaignId, sessions),
    })
  | CreateSession(draftSession) =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            SessionData.createSession(draftSession)
            |> then_(session =>
                 self.send(CreateSessionSuccess(session)) |> resolve
               )
            |> ignore
          );
          ();
        }
      ),
    )
  | CreateSessionSuccess(session) =>
    ReasonReact.UpdateWithSideEffects(
      {
        ...state,
        sessionsByCampaign:
          Belt.Map.Int.update(
            state.sessionsByCampaign, session.campaign_id, sessions =>
            switch (sessions) {
            | Some(sessions) => Some(List.append(sessions, [session]))
            | None => None
            }
          ),
      },
      (self => self.send(FetchSessions(session.campaign_id))),
    )
  };

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | ["campaigns", campaignId, "sessions", "add"] =>
    AddSession(int_of_string(campaignId))
  | ["campaigns", campaignId, "sessions", sessionId] =>
    ViewOneSession(int_of_string(campaignId), int_of_string(sessionId))
  | ["campaigns", "add"] => AddCampaign
  | ["campaigns", campaignId] => ViewOneCampaign(int_of_string(campaignId))
  | ["campaigns"] => ListAllCampaigns
  | _ => AddCampaign
  };

let component = ReasonReact.reducerComponent("CampaignsApp");

let make = (~campaigns, ~systems, _children) => {
  ...component,
  initialState: () => {
    route: Loading,
    sessionsByCampaign: Belt.Map.Int.empty,
  },
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
  render: ({state: {route, sessionsByCampaign}}) =>
    switch (route) {
    | Loading => s("Loading...")
    | AddSession(campaignId) =>
      <SessionCreationPage
        campaign=(
          List.find(
            (c: CampaignData.campaign) => c.id == campaignId,
            campaigns,
          )
        )
      />
    | ViewOneSession(campaignId, sessionId) =>
      let sessions = Belt.Map.Int.get(sessionsByCampaign, campaignId);
      switch (sessions) {
      | Some(sessions) =>
        <SessionDetailPage
          campaign=(
            List.find(
              (c: CampaignData.campaign) => c.id === campaignId,
              campaigns,
            )
          )
          session=(
            List.find(
              (s: SessionData.session) => s.id === sessionId,
              sessions,
            )
          )
        />
      | None => s("Loading...")
      };
    | ListAllCampaigns => <CampaignListPage campaigns systems />
    | ViewOneCampaign(id) =>
      <CampaignDetailsPage
        sessions=(Belt.Map.Int.get(sessionsByCampaign, id))
        campaign=(
          List.find((c: CampaignData.campaign) => c.id === id, campaigns)
        )
      />
    | AddCampaign => <CampaignCreationPage systems />
    },
};
