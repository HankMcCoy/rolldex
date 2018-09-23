defmodule Rpgr.Repo.Migrations.AssociateThingsWithUsers do
  use Ecto.Migration
  alias Rpgr.Repo
  alias Rpgr.CampaignContext

  def change do
    # Delete all the things, to prepare the way
    Repo.delete_all(CampaignContext.Noun)
    Repo.delete_all(CampaignContext.Session)
    Repo.delete_all(CampaignContext.Campaign)

    alter table(:campaigns) do
      add(:created_by_id, references(:users, on_delete: :nothing), null: false)
    end
  end
end
