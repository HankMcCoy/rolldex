open Util;

let component = ReasonReact.statelessComponent("Heading");

let h1Styles = style(~fontSize="48px", ~fontWeight="300", ());

let h2Styles = style(~fontSize="36px", ~fontWeight="300", ());

let h3Styles = style(~fontSize="24px", ~fontWeight="400", ());

let make = (~l, children) => {
  ...component,
  render: _self =>
    switch (l) {
    | 1 =>
      ReasonReact.createDomElement(
        "h1",
        ~props={"style": h1Styles},
        children,
      )
    | 2 =>
      ReasonReact.createDomElement(
        "h2",
        ~props={"style": h2Styles},
        children,
      )
    | 3 =>
      ReasonReact.createDomElement(
        "h3",
        ~props={"style": h3Styles},
        children,
      )
    | _ => <div> (s("BAD HEADING")) </div>
    },
};
