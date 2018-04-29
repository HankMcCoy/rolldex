open Util;

type route =
  | ListAll
  | ViewOne(int)
  | Create;

type state = {
  route,
  systems: option(list(SystemData.system)),
};

type action =
  | ChangeRoute(route)
  | FetchSystems
  | FetchSystemsSuccess(list(SystemData.system));

let reducer = (action, state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({...state, route})
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

let mapUrlToRoute = (url: ReasonReact.Router.url) => {
  Js.log(url);
  switch (url.path) {
  | ["systems", "edit"] => Create
  | ["systems", id] => ViewOne(int_of_string(id))
  | ["systems"] => ListAll
  | _ => Create
  };
};

let component = ReasonReact.reducerComponent("SystemsApp");

let make = _children => {
  ...component,
  initialState: () => {
    route: mapUrlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
    systems: None,
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
  render: ({state: {route, systems}}) =>
    switch (route, systems) {
    | (_, None) => <Page> (s("Loading...")) </Page>
    | (ListAll, Some(systems)) => <SystemListPage systems />
    | (ViewOne(id), Some(systems)) =>
      <SystemDetailsPage
        system=(List.find((s: SystemData.system) => s.id === id, systems))
      />
    | (Create, _) => <SystemCreationPage />
    },
  didMount: self => self.send(FetchSystems),
};
