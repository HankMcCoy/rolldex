open Util;

let component = ReasonReact.statelessComponent("PreviewCard");

let make = (~title, ~description, ~href, _children) => {
  ...component,
  render: _self =>
    <Link
      style=(
        style(
          ~color="#444",
          ~display="block",
          ~textDecoration="none",
          ~background="#F8F8F8",
          ~border="1px solid #ddd",
          ~padding="10px",
          (),
        )
      )
      href>
      <Heading l=3> (s(title)) </Heading>
      <Spacer height="10px" />
      <div> (s(description)) </div>
    </Link>,
};
