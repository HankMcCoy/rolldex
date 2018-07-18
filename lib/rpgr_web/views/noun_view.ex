defmodule RpgrWeb.NounView do
  use RpgrWeb, :view
  alias RpgrWeb.NounView

  def render("index.json", %{nouns: nouns}) do
    %{data: render_many(nouns, NounView, "noun.json")}
  end

  def render("show.json", %{noun: noun}) do
    %{data: render_one(noun, NounView, "noun.json")}
  end

  def render("noun.json", %{noun: noun}) do
    %{
      id: noun.id,
      name: noun.name,
      noun_type: noun.noun_type,
      summary: noun.summary,
      notes: noun.notes,
      campaign_id: noun.campaign_id,
      inserted_at: noun.inserted_at,
      updated_at: noun.updated_at
    }
  end

  def render("related_nouns.json", %{nouns: nouns}) do
    %{data: render_many(nouns, NounView, "noun.json")}
  end

  def render("related_sessions.json", %{sessions: sessions}) do
    %{data: render_many(sessions, RpgrWeb.SessionView, "session.json")}
  end
end
