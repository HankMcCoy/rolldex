open Util;

let component = ReasonReact.statelessComponent("PreviewCard");

let make = (~title, ~description, ~badge=None, ~href, _children) => {
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
      <div
        style=(
          style(
            ~display="flex",
            ~justifyContent="space-between",
            ~alignItems="center",
            (),
          )
        )>
        <div> <Heading l=3> (s(title)) </Heading> </div>
        <div>
          (
            switch (badge) {
            | None => ReasonReact.null
            | Some(badge) => badge
            }
          )
        </div>
      </div>
      <Spacer height="10px" />
      <div> (s(description)) </div>
    </Link>,
};
