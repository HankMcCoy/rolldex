defmodule RpgrWeb.NounTemplateView do
  use RpgrWeb, :view
  alias RpgrWeb.NounTemplateView

  def render("index.json", %{noun_templates: noun_templates}) do
    %{data: render_many(noun_templates, NounTemplateView, "noun_template.json")}
  end

  def render("show.json", %{noun_template: noun_template}) do
    %{data: render_one(noun_template, NounTemplateView, "noun_template.json")}
  end

  def render("noun_template.json", %{noun_template: noun_template}) do
    %{
      id: noun_template.id,
      name: noun_template.name,
      noun_type: noun_template.noun_type,
      summary: noun_template.summary,
      notes: noun_template.notes,
      private_notes: noun_template.private_notes,
      campaign_id: noun_template.campaign_id,
      inserted_at: noun_template.inserted_at,
      updated_at: noun_template.updated_at
    }
  end
end
