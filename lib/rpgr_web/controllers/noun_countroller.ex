defmodule RpgrWeb.NounController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Noun

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, _params) do
    nouns = CampaignContext.list_nouns()
    render(conn, "index.json", nouns: nouns)
  end

  def create(conn, %{"noun" => noun_params}) do
    with {:ok, %Noun{} = noun} <- CampaignContext.create_noun(noun_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", campaign_noun_path(conn, :show, noun.campaign_id, noun.id))
      |> render("show.json", noun: noun)
    end
  end

  def show(conn, %{"id" => id}) do
    noun = CampaignContext.get_noun!(id)
    render(conn, "show.json", noun: noun)
  end

  def update(conn, %{"id" => id, "noun" => noun_params}) do
    noun = CampaignContext.get_noun!(id)

    with {:ok, %Noun{} = noun} <- CampaignContext.update_noun(noun, noun_params) do
      render(conn, "show.json", noun: noun)
    end
  end

  def delete(conn, %{"id" => id}) do
    noun = CampaignContext.get_noun!(id)

    with {:ok, %Noun{}} <- CampaignContext.delete_noun(noun) do
      send_resp(conn, :no_content, "")
    end
  end

  def related_nouns(conn, %{"noun_id" => id}) do
    nouns = CampaignContext.get_related_nouns_for_noun(id)
    render(conn, "index.json", nouns: nouns)
  end

  def related_sessions(conn, %{"noun_id" => id}) do
    sessions = CampaignContext.get_related_sessions_for_noun(id)
    render(conn, "related_sessions.json", sessions: sessions)
  end
end
