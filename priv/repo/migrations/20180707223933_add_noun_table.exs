defmodule Rpgr.Repo.Migrations.AddNounTable do
  use Ecto.Migration

  def change do
    create table(:nouns) do
      add :name, :string
      add :description, :text
      add :nounType, :string
      add :campaign_id, references(:campaigns, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:nouns, [:campaign_id])
  end
end
