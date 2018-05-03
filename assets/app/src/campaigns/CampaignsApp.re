open Util;

type route =
  | ListAll
  | ViewOne(int)
  | Create;

type state = {route};

type action =
  | ChangeRoute(route);

let reducer = (action, _state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({route: route})
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

let make = (~campaigns, ~systems, _children) => {
  ...component,
  initialState: () => {
    route: mapUrlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
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
  render: ({state: {route}}) =>
    switch (route) {
    | ListAll => <CampaignListPage campaigns />
    | ViewOne(id) =>
      <CampaignDetailsPage
        campaign=(
          List.find((s: CampaignData.campaign) => s.id === id, campaigns)
        )
      />
    | Create => <CampaignCreationPage systems />
    },
};
