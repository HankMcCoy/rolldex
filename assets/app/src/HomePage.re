let component = ReasonReact.statelessComponent("HomePage");

let make = _children => {
  ...component,
  render: _self => <div> (ReasonReact.string("Home")) </div>,
};
