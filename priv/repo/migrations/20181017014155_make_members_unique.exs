defmodule Rpgr.Repo.Migrations.MakeMembersUnique do
  use Ecto.Migration
  alias Rpgr.Repo
  alias Rpgr.CampaignContext

  def change do
    # Delete existing, broken members
    Repo.delete_all(CampaignContext.Member)

    create(unique_index(:campaign_members, [:user_id, :campaign_id]))
  end
end
