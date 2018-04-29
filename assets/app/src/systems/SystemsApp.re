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
  | ["systems", "edit"] => Create
  | ["systems", id] => ViewOne(int_of_string(id))
  | ["systems"] => ListAll
  | _ => Create
  };

let component = ReasonReact.reducerComponent("SystemsApp");

let make = _children => {
  ...component,
  initialState: () => {
    route: mapUrlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
  },
  reducer: (action, _state) => {
    Js.log(action);
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({route: route})
    };
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
  render: ({state: {route}}) =>
    switch (route) {
    | ListAll => <SystemListPage />
    | ViewOne(id) => <SystemDetailsPage id />
    | Create => <SystemCreationPage />
    },
};
