open Util;

let component = ReasonReact.statelessComponent("Page");

let make = children => {
  ...component,
  render: _self =>
    ReasonReact.createDomElement(
      "div",
      ~props={"style": style(~padding="35px 30px", ())},
      children,
    ),
};
