open Util;

let component = ReasonReact.statelessComponent("Systempage");

let make = (~id, _children) => {
  ...component,
  render: _self =>
    <Page> (ReasonReact.string("System " ++ string_of_int(id))) </Page>,
};
