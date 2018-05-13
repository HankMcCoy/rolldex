open Util;

type addButtonSize =
  | Medium
  | Large;

let component = ReasonReact.statelessComponent("AddButton");

let genericStyle =
  style(
    ~padding="0",
    ~border="none",
    ~borderRadius="2px",
    ~textAlign="center",
    (),
  );

let make = (~fgColor, ~bgColor, ~size, ~href=?, _children) => {
  ...component,
  render: _self => {
    let pxSize =
      switch (size) {
      | Medium => "34px"
      | Large => "44px"
      };
    let customStyle =
      style(
        ~width=pxSize,
        ~height=pxSize,
        ~lineHeight=pxSize,
        ~color=Color.getHex(fgColor),
        ~background=Color.getHex(bgColor),
        ~fontSize=
          switch (size) {
          | Medium => "36px"
          | Large => "48px"
          },
        (),
      );
    switch (href) {
    | None =>
      <button style=(combineStyles(genericStyle, customStyle))>
        (s("+"))
      </button>
    | Some(href) =>
      <Link href style=(combineStyles(genericStyle, customStyle))>
        (s("+"))
      </Link>
    };
  },
};
