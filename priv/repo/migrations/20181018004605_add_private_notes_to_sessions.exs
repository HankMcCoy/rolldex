defmodule Rpgr.Repo.Migrations.AddPrivateNotesToSessions do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      add(:private_notes, :text, default: "")
    end
  end
end
