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

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | ["systems", "add"] => Create
  | ["systems", id] => ViewOne(int_of_string(id))
  | ["systems"] => ListAll
  | _ => Create
  };

let component = ReasonReact.reducerComponent("SystemsApp");

let make = (~systems, _children) => {
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
    | ListAll => <SystemListPage systems />
    | ViewOne(id) =>
      <SystemDetailsPage
        system=(List.find((s: SystemData.system) => s.id === id, systems))
      />
    | Create => <SystemCreationPage />
    },
};
