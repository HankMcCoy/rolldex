defmodule Rpgr.CampaignContext.Campaign do
  use Ecto.Schema
  import Ecto.Changeset

  schema "campaigns" do
    field(:description, :string)
    field(:name, :string)
    belongs_to(:created_by, User)

    timestamps()
  end

  @doc false
  def create_changeset(campaign, attrs) do
    campaign
    |> cast(attrs, [:name, :description, :created_by_id])
    |> validate_required([:name, :description, :created_by_id])
  end

  def update_changeset(campaign, attrs) do
    campaign
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
