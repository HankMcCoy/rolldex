open Util;

module Badge = {
  let color = Color.getHex(Color.SystemsBlue);
  let component = ReasonReact.statelessComponent("CampaignListPage");
  let make = children => {
    ...component,
    render: _self =>
      <div
        style=(
          style(
            ~color,
            ~border="1px solid " ++ color,
            ~borderRadius="3px",
            ~fontSize="12px",
            ~position="relative",
            (),
          )
        )>
        <div
          style=(
            style(
              ~position="absolute",
              ~top="0",
              ~left="0",
              ~bottom="0",
              ~right="0",
              ~background=color,
              ~opacity="0.05",
              (),
            )
          )
        />
        (
          ReasonReact.createDomElement(
            "div",
            ~props={
              "style":
                style(
                  ~padding="0 10px",
                  ~height="23px",
                  ~lineHeight="25px",
                  (),
                ),
            },
            children,
          )
        )
      </div>,
  };
};

let component = ReasonReact.statelessComponent("CampaignListPage");

let make =
    (
      ~campaigns: list(CampaignData.campaign),
      ~systems: list(SystemData.system),
      _children,
    ) => {
  ...component,
  render: _self => {
    let systemMap = SystemData.getSystemMap(systems);
    <div>
      <PageHeader
        title="Campaigns" breadcrumbs=[] background=Color.CampaignsPeriwinkle>
        <AddButton
          size=Large
          bgColor=Color.White
          fgColor=Color.CampaignsPeriwinkle
          href="/campaigns/add"
        />
      </PageHeader>
      <PageContent>
        <ul style=(style(~maxWidth="400px", ()))>
          (
            campaigns
            |> List.map((campaign: CampaignData.campaign) => {
                 let associatedSystem =
                   SystemData.getSystemFromMap(campaign.system_id, systemMap);
                 <li
                   key=(string_of_int(campaign.id))
                   style=(style(~marginBottom="10px", ()))>
                   <PreviewCard
                     href=("/campaigns/" ++ string_of_int(campaign.id))
                     title=campaign.name
                     badge=(
                       Some(<Badge> (s(associatedSystem.name)) </Badge>)
                     )
                     description=campaign.description
                   />
                 </li>;
               })
            |> Array.of_list
            |> ReasonReact.array
          )
        </ul>
        <Spacer height="20px" />
      </PageContent>
    </div>;
  },
};
