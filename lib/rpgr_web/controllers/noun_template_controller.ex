defmodule RpgrWeb.NounTemplateController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignContext.NounTemplate

  action_fallback(RpgrWeb.FallbackController)

  @noun_templates [
    %{
      id: 12,
      name: "Add person name here",
      noun_type: "PERSON",
      campaign_id: 3,
      summary: "Quick desc of person",
      notes: "First impressions:",
      private_notes: "SECRETS:",
      inserted_at: DateTime.to_iso8601(DateTime.utc_now()),
      updated_at: DateTime.to_iso8601(DateTime.utc_now())
    },
    %{
      id: 13,
      name: "Add place name here",
      noun_type: "PLACE",
      campaign_id: 3,
      summary: "Quick desc of place",
      notes: "Location:",
      private_notes: "SECRETS:",
      inserted_at: DateTime.to_iso8601(DateTime.utc_now()),
      updated_at: DateTime.to_iso8601(DateTime.utc_now())
    },
    %{
      id: 14,
      name: "Add thing name here",
      noun_type: "THING",
      campaign_id: 3,
      summary: "Quick desc of thing",
      notes: "Weight:",
      private_notes: "SECRETS:",
      inserted_at: DateTime.to_iso8601(DateTime.utc_now()),
      updated_at: DateTime.to_iso8601(DateTime.utc_now())
    },
    %{
      id: 14,
      name: "Add faction name here",
      noun_type: "FACTION",
      campaign_id: 3,
      summary: "Quick desc of faction",
      notes: "Motive:",
      private_notes: "SECRETS:",
      inserted_at: DateTime.to_iso8601(DateTime.utc_now()),
      updated_at: DateTime.to_iso8601(DateTime.utc_now())
    }
  ]

  def index(conn, %{"campaign_id" => campaign_id}) do
    render(conn, "index.json", noun_templates: @noun_templates)
  end

  def show(conn, %{"id" => id}) do
    {id, _} = Integer.parse(id)
    render(conn, "show.json", noun_template: Enum.find(@noun_templates, fn x -> x[:id] == id end))
  end

  def update(conn, %{"id" => id, "noun_template" => noun_template_params}) do
    {id, _} = Integer.parse(id)
    render(conn, "show.json", noun_template: Enum.find(@noun_templates, fn x -> x[:id] == id end))
  end
end
