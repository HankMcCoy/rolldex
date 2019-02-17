defmodule Rpgr.Repo.Migrations.AddNounTemplates do
  use Ecto.Migration

  def change do
    execute("create type noun_type as enum ('PERSON', 'PLACE', 'THING', 'FACTION')")

    create table(:noun_templates) do
      add(:name, :string)
      add(:summary, :text)
      add(:notes, :text, default: "")
      add(:private_notes, :text, default: "")
      add(:noun_type, :noun_type)
      add(:campaign_id, references(:campaigns, on_delete: :delete_all), null: false)

      timestamps()
    end

    # There should only be one template of each type for any given campaign.
    create(unique_index(:noun_templates, [:campaign_id, :noun_type]))
  end

  def down do
    drop(table(:noun_templates))
    execute("drop type noun_type")
  end
end
