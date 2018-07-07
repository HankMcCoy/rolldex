defmodule Rpgr.Repo.Migrations.FixNounTypeColumn do
  use Ecto.Migration

  def change do
    rename table(:nouns), :nounType, to: :noun_type
  end
end
