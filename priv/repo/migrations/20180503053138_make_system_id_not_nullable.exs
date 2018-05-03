defmodule Rpgr.Repo.Migrations.MakeSystemIdNotNullable do
  use Ecto.Migration

  def change do
    alter table(:campaigns) do
      remove :system_id
      add :system_id, references(:systems, on_delete: :nothing), null: false
    end
  end
end
