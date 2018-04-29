open Util;

let component = ReasonReact.statelessComponent("Systempage");

let make = (~system: SystemData.system, _children) => {
  ...component,
  render: _self =>
    <Page>
      <h1> (s(system.name)) </h1>
      <p> (s(system.description)) </p>
    </Page>,
};
