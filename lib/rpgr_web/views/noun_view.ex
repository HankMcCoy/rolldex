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
    %{id: noun.id,
      name: noun.name,
      nounType: noun.nounType,
      description: noun.description,
      campaign_id: noun.campaign_id}
  end
end
