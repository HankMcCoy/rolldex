defmodule Rpgr.Repo.Migrations.CreateCampaigns do
  use Ecto.Migration

  def change do
    create table(:campaigns) do
      add :name, :string
      add :description, :string
      add :system_id, references(:systems, on_delete: :nothing)

      timestamps()
    end

    create index(:campaigns, [:system_id])
  end
end
