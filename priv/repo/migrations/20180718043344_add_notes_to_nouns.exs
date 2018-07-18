defmodule Rpgr.Repo.Migrations.AddNotesToNouns do
  use Ecto.Migration

  def change do
    rename(table(:nouns), :description, to: :summary)

    alter table(:nouns) do
      add(:notes, :text, default: "")
    end
  end
end
