defmodule Rpgr.Repo.Migrations.RmSystems do
  use Ecto.Migration

  def change do
    alter table(:campaigns) do
      remove(:system_id)
    end

    drop(table(:systems))
  end
end
