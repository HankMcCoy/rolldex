let getTarget = event =>
  ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event));

let style = ReactDOMRe.Style.make;

let combineStyles = ReactDOMRe.Style.combine;

let s = ReasonReact.string;

type subApp =
  | CampaignsSubApp
  | SystemsSubApp
  | SettingsSubApp;

module Color = {
  type color =
    | White
    | SystemsBlue
    | SystemsLightBlue
    | CampaignsPeriwinkle
    | CampaignsLightPeriwinkle;
  let getHex = (color: color) =>
    switch (color) {
    | White => "#fff"
    | SystemsBlue => "#417F9C"
    | SystemsLightBlue => "#E4EAED"
    | CampaignsPeriwinkle => "#6C6EA0"
    | CampaignsLightPeriwinkle => "#E4E4ED"
    };
};

module JsonApi = {
  let get = (~url, ~decode) =>
    Js.Promise.(
      Fetch.fetch(url)
      |> then_(Fetch.Response.json)
      |> then_(json => Json.Decode.field("data", decode, json) |> resolve)
    );

  let post = (~url, ~payload, ~decode) =>
    Js.Promise.(
      Fetch.fetchWithInit(
        url,
        Fetch.RequestInit.make(
          ~method_=Post,
          ~body=
            Fetch.BodyInit.make(
              Js.Json.stringify(Js.Json.object_(payload)),
            ),
          ~headers=
            Fetch.HeadersInit.make({"Content-Type": "application/json"}),
          (),
        ),
      )
      |> then_(Fetch.Response.json)
      |> then_(json => Json.Decode.field("data", decode, json) |> resolve)
    );

  let put = (~url, ~payload, ~decode) =>
    Js.Promise.(
      Fetch.fetchWithInit(
        url,
        Fetch.RequestInit.make(
          ~method_=Put,
          ~body=
            Fetch.BodyInit.make(
              Js.Json.stringify(Js.Json.object_(payload)),
            ),
          ~headers=
            Fetch.HeadersInit.make({"Content-Type": "application/json"}),
          (),
        ),
      )
      |> then_(Fetch.Response.json)
      |> then_(json => Json.Decode.field("data", decode, json) |> resolve)
    );
};