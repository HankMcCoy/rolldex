defmodule RpgrWeb.CampaignController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Campaign
  require Logger

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, _params) do
    user = get_user(conn)
    campaigns = CampaignContext.list_campaigns(user.id)
    render(conn, "index.json", campaigns: campaigns)
  end

  def create(conn, %{"campaign" => campaign_params}) do
    user = get_user(conn)
    attrs = Map.put(campaign_params, "created_by_id", user.id)

    with {:ok, %Campaign{} = campaign} <- CampaignContext.create_campaign(attrs) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", campaign_path(conn, :show, campaign))
      |> render("show.json", campaign: campaign)
    end
  end

  def show(conn, %{"id" => campaign_id}) do
    user = get_user(conn)
    campaign = CampaignContext.get_campaign(user.id, campaign_id)
    render(conn, "show.json", campaign: campaign)
  end

  def update(conn, %{"id" => campaign_id, "campaign" => campaign_params}) do
    user = get_user(conn)
    campaign = CampaignContext.get_campaign(user.id, campaign_id)

    with {:ok, %Campaign{} = campaign} <-
           CampaignContext.update_campaign(user.id, campaign, campaign_params) do
      render(conn, "show.json", campaign: campaign)
    end
  end

  def delete(conn, %{"id" => campaign_id}) do
    user = get_user(conn)
    campaign = CampaignContext.get_campaign(user.id, campaign_id)

    with {:ok, %Campaign{}} <- CampaignContext.delete_campaign(user.id, campaign) do
      send_resp(conn, :no_content, "")
    end
  end
end
