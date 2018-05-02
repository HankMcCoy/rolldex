open Util;

let component = ReasonReact.statelessComponent("Para");

let make = (~text, _children) => {
  ...component,
  render: _self =>
    <p style=(style(~lineHeight="1.4", ~fontSize="16px", ~color="#444", ()))>
      (s(text))
    </p>,
};
