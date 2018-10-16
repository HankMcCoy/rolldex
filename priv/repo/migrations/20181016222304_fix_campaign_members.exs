defmodule Rpgr.Repo.Migrations.AssociateThingsWithUsers do
  use Ecto.Migration
  alias Rpgr.Repo
  alias Rpgr.CampaignContext

  def change do
    # Delete existing, broken members
    Repo.delete_all(CampaignContext.Member)

    alter table(:campaign_members) do
      remove(:campaign_id)
      add(:campaign_id, references(:campaigns, on_delete: :nothing), null: false)
    end
  end
end
