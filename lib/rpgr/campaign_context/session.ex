defmodule Rpgr.CampaignContext.Session do
  use Ecto.Schema
  import Ecto.Changeset


  schema "sessions" do
    field :name, :string
    field :notes, :string
    field :summary, :string
    field :campaign_id, :id

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:name, :summary, :notes, :campaign_id])
    |> validate_required([:name, :summary, :notes, :campaign_id])
  end
end
