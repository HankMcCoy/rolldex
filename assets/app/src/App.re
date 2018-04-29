let component = ReasonReact.statelessComponent("App");

let style = ReactDOMRe.Style.make;

let make = _children => {
  ...component,
  render: _self =>
    <div style=(style(~display="flex", ()))>
      <div style=(style(~width="300px", ~height="100vh", ()))> <Nav /> </div>
      <div> <Systems /> </div>
    </div>,
};
