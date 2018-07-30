defmodule Rpgr.Repo.Migrations.SwitchToEmail do
  use Ecto.Migration

  def change do
    rename(table(:users), :username, to: :email)
  end
end
