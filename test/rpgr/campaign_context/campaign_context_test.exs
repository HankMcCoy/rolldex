defmodule Rpgr.CampaignContextTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext
  alias Rpgr.Auth

  describe "campaigns" do
    alias CampaignContext.Campaign
    alias Auth.User

    test "list_campaigns/0 returns a campaigns" do
      user = insert(:user)

      %Campaign{id: id} =
        insert(:campaign, name: "first campaign", description: "this is first", created_by: user)

      campaign_list = CampaignContext.list_campaigns(user.id)
      assert length(campaign_list) == 1

      %User{id: user_id} = user

      assert [
               %Campaign{
                 id: ^id,
                 name: "first campaign",
                 description: "this is first",
                 created_by_id: ^user_id
               }
             ] = campaign_list
    end

    test "list_campaigns/0 won't return campaigns unrelated to the calling user" do
      cur_user = insert(:user)
      other_user = insert(:user)

      %Campaign{id: campaign_id_for_cur_user} = insert(:campaign, created_by: cur_user)
      insert(:campaign, created_by: other_user)

      campaign_list = CampaignContext.list_campaigns(cur_user.id)

      assert length(campaign_list) == 1

      assert [
               %Campaign{
                 id: ^campaign_id_for_cur_user
               }
             ] = campaign_list
    end
  end
end
