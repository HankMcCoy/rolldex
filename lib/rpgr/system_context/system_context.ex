defmodule Rpgr.SystemContext do
  import Ecto.Query, warn: false
  alias Rpgr.Repo

  alias Rpgr.SystemContext.System

  def list_systems do
    Repo.all(System)
  end

  def get_system!(id), do: Repo.get!(System, id)

  def create_system(attrs \\ %{}) do
    %System{}
    |> System.changeset(attrs)
    |> Repo.insert()
  end

  def update_system(%System{} = system, attrs) do
    system
    |> System.changeset(attrs)
    |> Repo.update()
  end

  def delete_system(%System{} = system) do
    Repo.delete(system)
  end

  def change_system(%System{} = system) do
    System.changeset(system, %{})
  end
end
