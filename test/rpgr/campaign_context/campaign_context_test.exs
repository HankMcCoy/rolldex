defmodule Rpgr.CampaignContextTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext

  describe "campaigns" do
    alias Rpgr.CampaignContext.Campaign

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def campaign_fixture(attrs \\ %{}) do
      {:ok, campaign} =
        attrs
        |> Enum.into(@valid_attrs)
        |> CampaignContext.create_campaign()

      campaign
    end

    test "list_campaigns/0 returns all campaigns" do
      campaign = campaign_fixture()
      assert CampaignContext.list_campaigns() == [campaign]
    end

    test "get_campaign!/1 returns the campaign with given id" do
      campaign = campaign_fixture()
      assert CampaignContext.get_campaign!(campaign.id) == campaign
    end

    test "create_campaign/1 with valid data creates a campaign" do
      assert {:ok, %Campaign{} = campaign} = CampaignContext.create_campaign(@valid_attrs)
      assert campaign.description == "some description"
      assert campaign.name == "some name"
    end

    test "create_campaign/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CampaignContext.create_campaign(@invalid_attrs)
    end

    test "update_campaign/2 with valid data updates the campaign" do
      campaign = campaign_fixture()
      assert {:ok, campaign} = CampaignContext.update_campaign(campaign, @update_attrs)
      assert %Campaign{} = campaign
      assert campaign.description == "some updated description"
      assert campaign.name == "some updated name"
    end

    test "update_campaign/2 with invalid data returns error changeset" do
      campaign = campaign_fixture()
      assert {:error, %Ecto.Changeset{}} = CampaignContext.update_campaign(campaign, @invalid_attrs)
      assert campaign == CampaignContext.get_campaign!(campaign.id)
    end

    test "delete_campaign/1 deletes the campaign" do
      campaign = campaign_fixture()
      assert {:ok, %Campaign{}} = CampaignContext.delete_campaign(campaign)
      assert_raise Ecto.NoResultsError, fn -> CampaignContext.get_campaign!(campaign.id) end
    end

    test "change_campaign/1 returns a campaign changeset" do
      campaign = campaign_fixture()
      assert %Ecto.Changeset{} = CampaignContext.change_campaign(campaign)
    end
  end
end
