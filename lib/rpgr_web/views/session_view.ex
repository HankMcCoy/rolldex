defmodule RpgrWeb.SessionView do
  use RpgrWeb, :view
  alias RpgrWeb.SessionView

  def render("index.json", %{sessions: sessions}) do
    %{data: render_many(sessions, SessionView, "session.json")}
  end

  def render("show.json", %{session: session}) do
    %{data: render_one(session, SessionView, "session.json")}
  end

  def render("session.json", %{session: session}) do
    %{id: session.id,
      name: session.name,
      summary: session.summary,
      notes: session.notes,
      campaign_id: session.campaign_id,
      inserted_at: session.inserted_at,
      updated_at: session.updated_at}
  end

  def render("related_nouns.json", %{nouns: nouns}) do
    %{data: render_many(nouns, RpgrWeb.NounView, "noun.json")}
  end
end
