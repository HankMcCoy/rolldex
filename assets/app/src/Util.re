let getTarget = event =>
  ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event));

let style = ReactDOMRe.Style.make;

let combineStyles = ReactDOMRe.Style.combine;

let s = ReasonReact.string;

module Color = {
  type color =
    | SystemsBlue
    | CampaignsPeriwinkle;
  let getHex = (color: color) =>
    switch (color) {
    | SystemsBlue => "#417F9C"
    | CampaignsPeriwinkle => "#6C6EA0"
    };
};
