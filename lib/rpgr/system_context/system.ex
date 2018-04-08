defmodule Rpgr.SystemContext.System do
  use Ecto.Schema
  import Ecto.Changeset

  schema "systems" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(system, attrs) do
    system
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
