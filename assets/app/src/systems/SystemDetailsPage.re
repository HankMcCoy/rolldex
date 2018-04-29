open Util;

let component = ReasonReact.statelessComponent("Systempage");

let make = (~system: SystemData.system, _children) => {
  ...component,
  render: _self => <Page> (ReasonReact.string(system.name)) </Page>,
};
