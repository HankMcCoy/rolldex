defmodule Rpgr.CampaignContext.Noun do
  use Ecto.Schema
  import Ecto.Changeset


  schema "nouns" do
    field :name, :string
    field :nounType, :string
    field :description, :string
    field :campaign_id, :id

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:name, :nounType, :description, :campaign_id])
    |> validate_required([:name, :nounType, :description, :campaign_id])
    |> validate_inclusion(:nounType, ["PERSON", "PLACE", "THING"])
  end
end
