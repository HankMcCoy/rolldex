open Util;

let component = ReasonReact.statelessComponent("PageSidebar");

let make = (~subApp, _children) => {
  ...component,
  render: _self =>
    <div
      style=(
        style(
          ~background=
            Color.getHex(
              switch (subApp) {
              | CampaignsSubApp => Color.CampaignsLightPeriwinkle
              | SystemsSubApp => Color.SystemsLightBlue
              | SettingsSubApp => Color.SystemsLightBlue
              },
            ),
          ~width="290px",
          ~minHeight="calc(100vh - 80px)",
          (),
        )
      )
    />,
};
