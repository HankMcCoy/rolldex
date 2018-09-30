defmodule RpgrWeb.SessionController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignRelations
  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Session

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, %{"campaign_id" => campaign_id}) do
    sessions = CampaignContext.list_sessions(campaign_id)
    render(conn, "index.json", sessions: sessions)
  end

  def create(conn, %{"session" => session_params}) do
    with {:ok, %Session{} = session} <- CampaignContext.create_session(session_params) do
      conn
      |> put_status(:created)
      |> put_resp_header(
        "location",
        campaign_session_path(conn, :show, session.campaign_id, session.id)
      )
      |> render("show.json", session: session)
    end
  end

  def show(conn, %{"id" => id}) do
    session = CampaignContext.get_session!(id)
    render(conn, "show.json", session: session)
  end

  def update(conn, %{"id" => id, "session" => session_params}) do
    session = CampaignContext.get_session!(id)

    with {:ok, %Session{} = session} <- CampaignContext.update_session(session, session_params) do
      render(conn, "show.json", session: session)
    end
  end

  def delete(conn, %{"id" => id}) do
    session = CampaignContext.get_session!(id)

    with {:ok, %Session{}} <- CampaignContext.delete_session(session) do
      send_resp(conn, :no_content, "")
    end
  end

  def related_nouns(conn, %{"session_id" => id}) do
    nouns = CampaignRelations.get_nouns_in_session(id)
    render(conn, "related_nouns.json", nouns: nouns)
  end
end
