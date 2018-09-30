defmodule Rpgr.Repo.Migrations.AddCampaignMembers do
  use Ecto.Migration

  def change do
    create table(:campaign_members) do
      add(:user_id, references(:users, on_delete: :nothing), null: false)
      add(:campaign_id, references(:users, on_delete: :nothing), null: false)
      add(:member_type, :string)

      timestamps()
    end

    create(index(:campaign_members, [:campaign_id, :user_id]))
  end
end
