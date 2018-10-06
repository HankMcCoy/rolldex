defmodule Rpgr.CampaignContext.Member do
  use Ecto.Schema
  import Ecto.Changeset
  alias Rpgr.CampaignContext.Campaign

  schema "campaign_members" do
    field(:member_type, :string)
    belongs_to(:user, Rpgr.Auth.User)
    belongs_to(:campaign, Campaign)

    timestamps()
  end

  @doc false
  def changeset(campaign, attrs) do
    campaign
    |> cast(attrs, [:user_id, :campaign_id, :member_type])
    |> validate_required([:user_id, :campaign_id, :member_type])
    |> validate_inclusion(:member_type, ["READ_ONLY"])
  end
end
