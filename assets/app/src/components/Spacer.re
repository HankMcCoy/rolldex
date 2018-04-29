open Util;

let component = ReasonReact.statelessComponent("Spacer");

let make = (~width="", ~height="", _children) => {
  ...component,
  render: _self => <div style=(style(~height, ~width, ())) />,
};
