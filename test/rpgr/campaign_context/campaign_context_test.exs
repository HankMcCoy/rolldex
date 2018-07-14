defmodule Rpgr.CampaignContextTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext

  describe "campaigns" do
    alias Rpgr.CampaignContext.Campaign

    test "list_campaigns/0 returns all campaigns" do
      system = insert(:system)

      %Campaign{id: id, system_id: system_id} =
        insert(:campaign, name: "first campaign", description: "this is first", system: system)

      campaignList = CampaignContext.list_campaigns()
      assert length(campaignList) == 1

      assert [
               %Campaign{
                 id: ^id,
                 system_id: ^system_id,
                 name: "first campaign",
                 description: "this is first"
               }
             ] = campaignList
    end

    test "get_campaign!/1 returns the campaign with given id" do
      system = insert(:system)
      campaign = insert(:campaign, name: "a name", description: "a description", system: system)

      %Campaign{id: id, system_id: system_id} = campaign

      assert %Campaign{
               id: ^id,
               name: "a name",
               description: "a description",
               system_id: ^system_id
             } = CampaignContext.get_campaign!(id)
    end

    test "create_campaign/1 with valid data creates a campaign" do
      system = insert(:system)

      assert {:ok, %Campaign{} = campaign} =
               CampaignContext.create_campaign(%{
                 name: "some name",
                 description: "some description",
                 system_id: system.id
               })

      assert campaign.description == "some description"
      assert campaign.name == "some name"
    end

    test "create_campaign/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CampaignContext.create_campaign(%{foo: 3})
    end

    test "update_campaign/2 with valid data updates the campaign" do
      system = insert(:system)
      origCampaign = insert(:campaign, system: system)

      assert {:ok, campaign} =
               CampaignContext.update_campaign(
                 origCampaign,
                 %{
                   id: origCampaign.id,
                   system_id: origCampaign.system_id,
                   name: "some updated name",
                   description: "some updated description"
                 }
               )

      assert %Campaign{} = campaign
      assert campaign.description == "some updated description"
      assert campaign.name == "some updated name"
    end

    test "delete_campaign/1 deletes the campaign" do
      system = insert(:system)
      campaign = insert(:campaign, system: system)
      assert {:ok, %Campaign{}} = CampaignContext.delete_campaign(campaign)
      assert_raise Ecto.NoResultsError, fn -> CampaignContext.get_campaign!(campaign.id) end
    end

    test "change_campaign/1 returns a campaign changeset" do
      system = insert(:system)
      campaign = insert(:campaign, system: system)
      assert %Ecto.Changeset{} = CampaignContext.change_campaign(campaign)
    end
  end
end
