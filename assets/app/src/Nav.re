open Util;

module NavItem = {
  let combine = ReactDOMRe.Style.combine;
  let navItemStyle =
    style(
      ~paddingLeft="20px",
      ~height="45px",
      ~lineHeight="45px",
      ~color="#fff",
      ~background="#5A605E",
      ~overflow="hidden",
      ~cursor="pointer",
      (),
    );
  let activeNavItemStyle = style(~background="#484D4B", ());
  let navItemTitleStyle =
    style(~height="45px", ~lineHeight="45px", ~fontSize="24px", ());
  let component = ReasonReact.statelessComponent("NavItem");
  let make = (~isActive, ~name, ~href, _children) => {
    ...component,
    render: _self =>
      <Link
        style=(
          isActive ? combine(navItemStyle, activeNavItemStyle) : navItemStyle
        )
        href>
        (ReasonReact.string(name))
      </Link>,
  };
};

let component = ReasonReact.statelessComponent("Nav");

let make = (~activeRoute: AppRoutes.route, _children) => {
  ...component,
  render: _self =>
    <div
      style=(style(~height="100%", ~background="#5A605E", ~color="#fff", ()))>
      <Link
        href="/"
        style=(
          style(
            ~color="#fff",
            ~height="80px",
            ~lineHeight="80px",
            ~fontSize="36px",
            ~fontWeight="300",
            ~paddingLeft="20px",
            ~background="#333",
            (),
          )
        )>
        (ReasonReact.string("Rolldex"))
      </Link>
      <NavItem
        isActive=(activeRoute === AppRoutes.Systems)
        href="/systems"
        name="Systems"
      />
      <NavItem
        isActive=(activeRoute === AppRoutes.Campaigns)
        href="/campaigns"
        name="Campaigns"
      />
    </div>,
};
