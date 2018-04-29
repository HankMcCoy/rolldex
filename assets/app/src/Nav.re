let style = ReactDOMRe.Style.make;

let combine = ReactDOMRe.Style.combine;

type navItem =
  | Systems
  | Campaigns
  | Settings;

type state = {toggledItem: option(navItem)};

type action =
  | ToggleItem(navItem);

let navItemStyle =
  style(
    ~paddingLeft="20px",
    ~height="45px",
    ~background="#5A605E",
    ~transition="background 0.2s, height 0.2s",
    ~overflow="hidden",
    ~cursor="pointer",
    (),
  );

let navItemTitleStyle =
  style(~height="45px", ~lineHeight="45px", ~fontSize="24px", ());

let navItemSubItemsStyle = style(~paddingLeft="10px", ());

let expandedNavItemStyle = style(~background="#484D4B", ~height="95px", ());

let component = ReasonReact.reducerComponent("Nav");

let make = _children => {
  ...component,
  initialState: () => {toggledItem: None},
  reducer: (action, state) =>
    switch (action) {
    | ToggleItem(navItem) =>
      ReasonReact.Update({
        toggledItem:
          state.toggledItem == Some(navItem) ? None : Some(navItem),
      })
    },
  render: ({send, state: {toggledItem}}) =>
    <div
      style=(style(~height="100%", ~background="#5A605E", ~color="#fff", ()))>
      <div
        style=(
          style(
            ~height="80px",
            ~lineHeight="80px",
            ~fontSize="36px",
            ~paddingLeft="20px",
            ~background="#333",
            (),
          )
        )>
        (ReasonReact.string("Rolldex"))
      </div>
      <div
        style=(
          toggledItem == Some(Systems) ?
            combine(navItemStyle, expandedNavItemStyle) : navItemStyle
        )
        onClick=(_event => send(ToggleItem(Systems)))>
        <div style=navItemTitleStyle> (ReasonReact.string("Systems")) </div>
        <div style=navItemSubItemsStyle>
          (ReasonReact.string("Sub-items"))
        </div>
      </div>
      <div style=navItemStyle>
        <div style=navItemTitleStyle> (ReasonReact.string("Campaigns")) </div>
      </div>
      <div style=navItemStyle>
        <div style=navItemTitleStyle> (ReasonReact.string("Settings")) </div>
      </div>
    </div>,
};
