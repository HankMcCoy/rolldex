defmodule RpgrWeb.SessionController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignRelations
  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Session

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, %{"campaign_id" => campaign_id}) do
    user = get_user(conn)
    sessions = CampaignContext.list_sessions(user.id, campaign_id)
    render(conn, "index.json", sessions: sessions)
  end

  def create(conn, %{"session" => session_params}) do
    user = get_user(conn)

    with {:ok, %Session{} = session} <- CampaignContext.create_session(user.id, session_params) do
      conn
      |> put_status(:created)
      |> put_resp_header(
        "location",
        campaign_session_path(conn, :show, session.campaign_id, session.id)
      )
      |> render("show.json", session: session)
    end
  end

  def show(conn, %{"id" => session_id}) do
    user = get_user(conn)
    session = CampaignContext.get_session(user.id, session_id)
    render(conn, "show.json", session: session)
  end

  def update(conn, %{"id" => session_id, "session" => session_params}) do
    user = get_user(conn)
    session = CampaignContext.get_session(user.id, session_id)

    with {:ok, %Session{} = session} <-
           CampaignContext.update_session(user.id, session, session_params) do
      render(conn, "show.json", session: session)
    end
  end

  def delete(conn, %{"id" => session_id}) do
    user = get_user(conn)
    session = CampaignContext.get_session(user.id, session_id)

    with {:ok, %Session{}} <- CampaignContext.delete_session(user.id, session) do
      send_resp(conn, :no_content, "")
    end
  end

  def related_nouns(conn, %{"session_id" => session_id}) do
    user = get_user(conn)
    nouns = CampaignRelations.get_nouns_in_session(user.id, session_id)
    render(conn, "related_nouns.json", nouns: nouns)
  end
end
