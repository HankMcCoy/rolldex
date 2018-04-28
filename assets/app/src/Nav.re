let component = ReasonReact.statelessComponent("Nav");

let style = ReactDOMRe.Style.make;

let navItemStyle = style(
	~paddingLeft="20px",
	()
);

let navItemTitleStyle = style(
	~height="45px",
	~lineHeight="45px",
	~fontSize="24px",
	()
);

let navItemSubItemsStyle = style(
	~paddingLeft="10px",
	()
);

let make = (_children) => {
  ...component,
	render: _self =>
		<div style=(style(
			~height="100%",
			~background="#555",
			~color="#fff", ()))>
			<div style=(style(
				~height="80px",
				~lineHeight="80px",
				~fontSize="36px",
				~paddingLeft="20px",
				~background="#333", ()))>
				(ReasonReact.string("Rolldex"))
			</div>
			<div style=(navItemStyle)>
				<div style=(navItemTitleStyle)>
					(ReasonReact.string("Systems"))
				</div>
				<div style=(navItemSubItemsStyle)>
					<Systems />
				</div>
			</div>
			<div style=(navItemStyle)>
				<div style=(navItemTitleStyle)>(ReasonReact.string("Campaigns"))</div>
			</div>
			<div style=(navItemStyle)>
				<div style=(navItemTitleStyle)>(ReasonReact.string("Settings"))</div>
			</div>
		</div>
};