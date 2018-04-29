defmodule Rpgr.SystemContext.System do
  use Ecto.Schema
  import Ecto.Changeset

  schema "systems" do
    field :name, :string
    field :description, :string
    timestamps()
  end

  @doc false
  def changeset(system, attrs) do
    system
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
