open Util;

type route =
  | ListAll
  | ViewOne(int)
  | Create;

type state = {
  route,
  campaigns: option(list(CampaignData.campaign)),
};

type action =
  | ChangeRoute(route)
  | FetchCampaigns
  | FetchCampaignsSuccess(list(CampaignData.campaign));

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
  };

let mapUrlToRoute = (url: ReasonReact.Router.url) => {
  Js.log(url);
  switch (url.path) {
  | ["campaigns", "add"] => Create
  | ["campaigns", id] => ViewOne(int_of_string(id))
  | ["campaigns"] => ListAll
  | _ => Create
  };
};

let component = ReasonReact.reducerComponent("CampaignsApp");

let make = _children => {
  ...component,
  initialState: () => {
    route: mapUrlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
    campaigns: None,
  },
  reducer,
  subscriptions: self => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(url =>
          self.send(ChangeRoute(url |> mapUrlToRoute))
        ),
      ReasonReact.Router.unwatchUrl,
    ),
  ],
  render: ({state: {route, campaigns}}) =>
    switch (route, campaigns) {
    | (_, None) => <PageContent> (s("Loading...")) </PageContent>
    | (ListAll, Some(campaigns)) => <CampaignListPage campaigns />
    | (ViewOne(id), Some(campaigns)) =>
      <CampaignDetailsPage
        campaign=(
          List.find((s: CampaignData.campaign) => s.id === id, campaigns)
        )
      />
    | (Create, _) => <CampaignCreationPage />
    },
  didMount: self => self.send(FetchCampaigns),
};
