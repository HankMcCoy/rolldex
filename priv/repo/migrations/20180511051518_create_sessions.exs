defmodule Rpgr.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :name, :string
      add :summary, :string
      add :notes, :text
      add :campaign_id, references(:campaigns, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:sessions, [:campaign_id])
  end
end
