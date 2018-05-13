open Util;

let component = ReasonReact.statelessComponent("PageContent");

let make = children => {
  ...component,
  render: _self =>
    ReasonReact.createDomElement(
      "div",
      ~props={"style": style(~padding="35px 30px", ~flex="1 0 0%", ())},
      children,
    ),
};
