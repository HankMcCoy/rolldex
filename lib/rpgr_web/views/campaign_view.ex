defmodule RpgrWeb.CampaignView do
  use RpgrWeb, :view
  alias RpgrWeb.CampaignView

  def render("index.json", %{campaigns: campaigns}) do
    %{data: render_many(campaigns, CampaignView, "campaign.json")}
  end

  def render("show.json", %{campaign: campaign}) do
    %{data: render_one(campaign, CampaignView, "campaign.json")}
  end

  def render("campaign.json", %{campaign: campaign}) do
    %{
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      created_by_id: campaign.created_by_id,
      inserted_at: campaign.inserted_at,
      updated_at: campaign.updated_at
    }
  end
end
