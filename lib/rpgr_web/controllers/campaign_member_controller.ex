defmodule RpgrWeb.CampaignMemberController do
  use RpgrWeb, :controller

  alias Rpgr.Auth
  alias Rpgr.Auth.User
  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Campaign
  alias Rpgr.CampaignContext.Member
  require Logger

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, %{"campaign_id" => campaign_id}) do
    user = get_user(conn)
    members = CampaignContext.list_members(user.id, campaign_id)
    render(conn, "index.json", members: members)
  end

  def create(conn, params) do
    %{"member" => member_params} = params
    cur_user = get_user(conn)

    with user when not is_nil(user) <- Auth.get_user_by_email(member_params["email"]),
         {:ok, %Member{} = member} <-
           CampaignContext.create_member(cur_user.id, %{
             "user_id" => user.id,
             "campaign_id" => member_params["campaign_id"],
             "member_type" => member_params["member_type"]
           }) do
      conn
      |> put_status(:created)
      |> render("show.json", member: member)
    else
      err ->
        Logger.error(inspect(err))

        conn
        |> send_resp(400, "")
    end
  end

  def show(conn, %{"id" => member_id}) do
    user = get_user(conn)
    member = CampaignContext.get_member(user.id, member_id)
    render(conn, "show.json", member: member)
  end

  def delete(conn, %{"id" => member_id}) do
    user = get_user(conn)
    member = CampaignContext.get_member(user.id, member_id)

    with {:ok, %Member{}} <- CampaignContext.delete_member(user.id, member) do
      send_resp(conn, :no_content, "")
    end
  end
end
