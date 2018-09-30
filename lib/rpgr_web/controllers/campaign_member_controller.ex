defmodule RpgrWeb.CampaignMemberController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Campaign
  alias Rpgr.CampaignContext.Member
  require Logger

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, %{"campaign_id" => campaign_id}) do
    members = CampaignContext.list_members(campaign_id)
    render(conn, "index.json", members: members)
  end

  def create(conn, %{"member" => member_params, "campaign_id" => campaign_id}) do
    attrs = Map.put(member_params, "campaign_id", campaign_id)

    with {:ok, %Member{} = member} <- CampaignContext.create_member(attrs) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", campaign_campaign_member_path(conn, :show, member))
      |> render("show.json", member: member)
    end
  end

  def show(conn, %{"id" => member_id}) do
    member = CampaignContext.get_member!(member_id)
    render(conn, "show.json", member: member)
  end

  def delete(conn, %{"id" => member_id}) do
    member = CampaignContext.get_member!(member_id)

    with {:ok, %Member{}} <- CampaignContext.delete_member(member) do
      send_resp(conn, :no_content, "")
    end
  end
end
