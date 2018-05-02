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
    | SystemsBlue
    | SystemsLightBlue
    | CampaignsPeriwinkle
    | CampaignsLightPeriwinkle;
  let getHex = (color: color) =>
    switch (color) {
    | SystemsBlue => "#417F9C"
    | SystemsLightBlue => "#E4EAED"
    | CampaignsPeriwinkle => "#6C6EA0"
    | CampaignsLightPeriwinkle => "#E4E4ED"
    };
};
