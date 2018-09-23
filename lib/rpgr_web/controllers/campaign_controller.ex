defmodule RpgrWeb.CampaignController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Campaign

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, _params) do
    campaigns = CampaignContext.list_campaigns()
    render(conn, "index.json", campaigns: campaigns)
  end

  def create(conn, %{"campaign" => campaign_params}) do
    user = Rpgr.Auth.Guardian.Plug.current_resource(conn)
    attrs = Map.put(campaign_params, "created_by_id", user.id)

    with {:ok, %Campaign{} = campaign} <- CampaignContext.create_campaign(attrs) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", campaign_path(conn, :show, campaign))
      |> render("show.json", campaign: campaign)
    end
  end

  def show(conn, %{"id" => id}) do
    campaign = CampaignContext.get_campaign!(id)
    render(conn, "show.json", campaign: campaign)
  end

  def update(conn, %{"id" => id, "campaign" => campaign_params}) do
    campaign = CampaignContext.get_campaign!(id)

    with {:ok, %Campaign{} = campaign} <-
           CampaignContext.update_campaign(campaign, campaign_params) do
      render(conn, "show.json", campaign: campaign)
    end
  end

  def delete(conn, %{"id" => id}) do
    campaign = CampaignContext.get_campaign!(id)

    with {:ok, %Campaign{}} <- CampaignContext.delete_campaign(campaign) do
      send_resp(conn, :no_content, "")
    end
  end
end
