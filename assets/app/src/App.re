open Util;

type state = {
  route: AppRoutes.route,
  systems: option(list(SystemData.system)),
  campaigns: option(list(CampaignData.campaign)),
};

type action =
  | ChangeRoute(AppRoutes.route)
  | FetchCampaigns
  | FetchCampaignsSuccess(list(CampaignData.campaign))
  | FetchSystems
  | FetchSystemsSuccess(list(SystemData.system));

let reducer = (action, state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({...state, route})
  | FetchCampaigns =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            CampaignData.getCampaigns()
            |> then_(campaigns => {
                 self.send(FetchCampaignsSuccess(campaigns));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | FetchCampaignsSuccess(campaigns) =>
    ReasonReact.Update({...state, campaigns: Some(campaigns)})
  | FetchSystems =>
    ReasonReact.SideEffects(
      (
        self => {
          Js.Promise.(
            SystemData.getSystems()
            |> then_(systems => {
                 self.send(FetchSystemsSuccess(systems));
                 resolve();
               })
          )
          |> ignore;
          ();
        }
      ),
    )
  | FetchSystemsSuccess(systems) =>
    ReasonReact.Update({...state, systems: Some(systems)})
  };

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | [] => AppRoutes.Home
  | ["systems", ..._theRest] => AppRoutes.Systems
  | ["campaigns", ..._theRest] => AppRoutes.Campaigns
  | _ => AppRoutes.Home
  };

let component = ReasonReact.reducerComponent("App");

let style = ReactDOMRe.Style.make;

let loadingEl = s("Loading...");

let make = _children => {
  ...component,
  reducer,
  initialState: () => {route: Home, campaigns: None, systems: None},
  subscriptions: self => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(url =>
          self.send(ChangeRoute(url |> mapUrlToRoute))
        ),
      ReasonReact.Router.unwatchUrl,
    ),
  ],
  render: self =>
    switch (self.state.systems, self.state.campaigns) {
    | (None, _campaigns) => loadingEl
    | (_systems, None) => loadingEl
    | (Some(systems), Some(campaigns)) =>
      <div style=(style(~display="flex", ()))>
        <div style=(style(~flex="0 0 300px", ~height="100vh", ()))>
          <Nav activeRoute=self.state.route />
        </div>
        <div style=(style(~flex="1 0 0%", ~minWidth="0px", ()))>
          (
            switch (self.state.route) {
            | Home => <HomePage />
            | Systems => <SystemsApp systems />
            | Campaigns => <CampaignsApp campaigns systems />
            }
          )
        </div>
      </div>
    },
  didMount: self => {
    self.send(FetchCampaigns);
    self.send(FetchSystems);
  },
};
