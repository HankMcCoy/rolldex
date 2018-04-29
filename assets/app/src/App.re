type state = {route: AppRoutes.route};

type action =
  | ChangeRoute(AppRoutes.route);

let reducer = (action, _state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({route: route})
  };

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | [] => AppRoutes.Home
  | ["systems"] => AppRoutes.Systems
  | ["campaigns"] => AppRoutes.Campaigns
  | _ => AppRoutes.Home
  };

let component = ReasonReact.reducerComponent("App");

let style = ReactDOMRe.Style.make;

let make = _children => {
  ...component,
  reducer,
  initialState: () => {route: Home},
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
    <div style=(style(~display="flex", ()))>
      <div style=(style(~width="300px", ~height="100vh", ()))>
        <Nav activeRoute=self.state.route />
      </div>
      <div>
        (
          switch (self.state.route) {
          | Home => <HomePage />
          | Systems => <SystemsPage />
          | Campaigns => <CampaignsPage />
          }
        )
      </div>
    </div>,
};
