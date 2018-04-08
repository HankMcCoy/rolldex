defmodule Rpgr.Repo.Migrations.CreateSystems do
  use Ecto.Migration

  def change do
    create table(:systems) do
      add :name, :string

      timestamps()
    end

  end
end
