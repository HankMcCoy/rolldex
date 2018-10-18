defmodule Rpgr.Repo.Migrations.AddPrivateNotesToNouns do
  use Ecto.Migration

  def change do
    alter table(:nouns) do
      add(:private_notes, :text, default: "")
    end
  end
end
