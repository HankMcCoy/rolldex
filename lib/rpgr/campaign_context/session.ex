defmodule Rpgr.CampaignContext.Session do
  alias Rpgr.CampaignContext.Campaign
  use Ecto.Schema
  import Ecto.Changeset

  schema "sessions" do
    field(:name, :string)
    field(:notes, :string)
    field(:summary, :string)
    belongs_to(:campaign, Campaign)

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:name, :summary, :notes, :campaign_id])
    |> validate_required([:name, :summary, :notes, :campaign_id])
  end
end
