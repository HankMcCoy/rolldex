defmodule Rpgr.CampaignContext.Campaign do
  use Ecto.Schema
  import Ecto.Changeset


  schema "campaigns" do
    field :description, :string
    field :name, :string
    field :system_id, :id

    timestamps()
  end

  @doc false
  def changeset(campaign, attrs) do
    campaign
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
