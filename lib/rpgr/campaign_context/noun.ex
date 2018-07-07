defmodule Rpgr.CampaignContext.Noun do
  use Ecto.Schema
  import Ecto.Changeset


  schema "nouns" do
    field :name, :string
    field :noun_type, :string
    field :description, :string
    field :campaign_id, :id

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:name, :noun_type, :description, :campaign_id])
    |> validate_required([:name, :noun_type, :description, :campaign_id])
    |> validate_inclusion(:noun_type, ["PERSON", "PLACE", "THING"])
  end
end
