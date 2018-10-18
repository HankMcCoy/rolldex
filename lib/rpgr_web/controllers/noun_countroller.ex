defmodule RpgrWeb.NounController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignRelations
  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Noun

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, %{"campaign_id" => campaign_id}) do
    user = get_user(conn)
    nouns = CampaignContext.list_nouns(user.id, campaign_id)
    render(conn, "index.json", nouns: nouns)
  end

  def create(conn, %{"noun" => noun_params}) do
    user = get_user(conn)

    with {:ok, %Noun{} = noun} <- CampaignContext.create_noun(user.id, noun_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", campaign_noun_path(conn, :show, noun.campaign_id, noun.id))
      |> render("show.json", noun: noun)
    end
  end

  def show(conn, %{"id" => noun_id}) do
    user = get_user(conn)
    noun = CampaignContext.get_noun(user.id, noun_id)
    render(conn, "show.json", noun: noun)
  end

  def update(conn, %{"id" => noun_id, "noun" => noun_params}) do
    user = get_user(conn)
    noun = CampaignContext.get_noun(user.id, noun_id)

    with {:ok, %Noun{} = noun} <- CampaignContext.update_noun(user.id, noun, noun_params) do
      render(conn, "show.json", noun: noun)
    end
  end

  def delete(conn, %{"id" => noun_id}) do
    user = get_user(conn)
    noun = CampaignContext.get_noun(user.id, noun_id)

    with {:ok, %Noun{}} <- CampaignContext.delete_noun(user.id, noun) do
      send_resp(conn, :no_content, "")
    end
  end

  def related_nouns(conn, %{"noun_id" => noun_id}) do
    user = get_user(conn)
    nouns = CampaignRelations.get_related_nouns_for_noun(user.id, noun_id)
    render(conn, "index.json", nouns: nouns)
  end

  def related_sessions(conn, %{"noun_id" => noun_id}) do
    user = get_user(conn)
    sessions = CampaignRelations.get_related_sessions_for_noun(user.id, noun_id)
    render(conn, "related_sessions.json", sessions: sessions)
  end
end
