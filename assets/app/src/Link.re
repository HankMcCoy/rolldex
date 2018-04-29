let component = ReasonReact.statelessComponent("Link");

let handleClick = (href, event) =>
  if (! ReactEventRe.Mouse.defaultPrevented(event)) {
    ReactEventRe.Mouse.preventDefault(event);
    ReasonReact.Router.push(href);
  };

let defaultLinkStyle =
  ReactDOMRe.Style.make(
    ~display="block",
    ~color="#444",
    ~textDecoration="none",
    (),
  );

let make = (~href, ~className=?, ~style=?, children) => {
  ...component,
  render: _self =>
    ReasonReact.createDomElement(
      "a",
      ~props={
        "href": href,
        "style":
          switch (style) {
          | Some(style) => ReactDOMRe.Style.combine(defaultLinkStyle, style)
          | None => defaultLinkStyle
          },
        "className":
          switch (className) {
          | Some(className) => className
          | None => ""
          },
        "onClick": handleClick(href),
      },
      children,
    ),
};
