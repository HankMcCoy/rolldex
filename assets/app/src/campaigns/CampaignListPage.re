open Util;

let component = ReasonReact.statelessComponent("CampaignListPage");

let make = (~campaigns: list(CampaignData.campaign), _children) => {
  ...component,
  render: _self =>
    <div>
      <PageHeader
        title="Campaigns" breadcrumbs=[] background=Color.CampaignsPeriwinkle>
        <AddButton size=Large subApp=CampaignsSubApp href="/campaigns/add" />
      </PageHeader>
      <PageContent>
        <ul style=(style(~maxWidth="400px", ()))>
          (
            campaigns
            |> List.map((campaign: CampaignData.campaign) =>
                 <li
                   key=(string_of_int(campaign.id))
                   style=(style(~marginBottom="10px", ()))>
                   <PreviewCard
                     href=("/campaigns/" ++ string_of_int(campaign.id))
                     title=campaign.name
                     description=campaign.description
                   />
                 </li>
               )
            |> Array.of_list
            |> ReasonReact.array
          )
        </ul>
        <Spacer height="20px" />
      </PageContent>
    </div>,
};
