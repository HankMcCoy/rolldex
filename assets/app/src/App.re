open Util;

type state = {
  route: AppRoutes.route,
  domainData: DomainData.domainDataState,
};

type action =
  | ChangeRoute(AppRoutes.route)
  | SystemAction(System.systemAction)
  | CampaignAction(Campaign.campaignAction);

let reducer = (action, state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({...state, route})
  | SystemAction(systemAction) =>
    switch (System.reducer(systemAction, state.domainData.systems)) {
    | ReasonReact.Update(nextState) =>
      ReasonReact.Update({
        ...state,
        domainData: {
          ...state.domainData,
          systems: nextState,
        },
      })
    | _ => ReasonReact.NoUpdate
    }
  | CampaignAction(_action) => ReasonReact.NoUpdate
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
  initialState: () => {
    route: Home,
    domainData: {
      campaigns: Campaign.initialState,
      systems: System.initialState,
    },
  },
  subscriptions: self => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(url =>
          self.send(ChangeRoute(url |> mapUrlToRoute))
        ),
      ReasonReact.Router.unwatchUrl,
    ),
  ],
  render: self => {
    let dispatch = action => self.send(action);
    <div style=(style(~display="flex", ()))>
      <div style=(style(~flex="0 0 300px", ~height="100vh", ()))>
        <Nav activeRoute=self.state.route />
      </div>
      <div style=(style(~flex="1 0 0%", ~minWidth="0px", ()))>
        (
          switch (self.state.route) {
          | Home => <HomePage />
          | Systems => <SystemsApp domainData=self.state.domainData dispatch />
          | Campaigns =>
            <CampaignsApp domainData=self.state.domainData dispatch />
          }
        )
      </div>
    </div>;
  },
  didMount: self => {
    self.send(SystemAction(System.GetSystems));
    self.send(CampaignAction(Campaign.GetCampaigns));
  },
};