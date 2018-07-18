defmodule Rpgr.CampaignContext.Noun do
  alias Rpgr.CampaignContext.Campaign
  use Ecto.Schema
  import Ecto.Changeset

  schema "nouns" do
    field(:name, :string)
    field(:noun_type, :string)
    field(:summary, :string)
    field(:notes, :string)
    belongs_to(:campaign, Campaign)

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:name, :noun_type, :summary, :notes, :campaign_id])
    |> validate_required([:name, :noun_type, :summary, :notes, :campaign_id])
    |> validate_inclusion(:noun_type, ["PERSON", "PLACE", "THING"])
  end
end
