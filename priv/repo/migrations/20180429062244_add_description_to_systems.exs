defmodule Rpgr.Repo.Migrations.AddDescriptionToSystems do
  use Ecto.Migration

  def change do
    alter table(:systems) do
      add :description, :text, [default: "A good system"]
    end
  end
end
