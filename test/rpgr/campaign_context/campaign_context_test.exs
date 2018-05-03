defmodule Rpgr.CampaignContextTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext
  alias Rpgr.SystemContext

  describe "campaigns" do
    alias Rpgr.CampaignContext.Campaign

    @valid_system %{name: "D&D 5.0", description: "An RPG"}

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil, system_id: nil}

    def system_fixture() do
      {:ok, system} =
        @valid_system
        |> Enum.into(@valid_system)
        |> SystemContext.create_system()

      system
    end

    def campaign_fixture(system, attrs \\ %{}) do
      {:ok, campaign} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Enum.into(%{system_id: system.id})
        |> CampaignContext.create_campaign()

      campaign
    end

    test "list_campaigns/0 returns all campaigns" do
      system = system_fixture()
      campaign = campaign_fixture(system)
      assert CampaignContext.list_campaigns() == [campaign]
    end

    test "get_campaign!/1 returns the campaign with given id" do
      system = system_fixture()
      campaign = campaign_fixture(system)
      assert CampaignContext.get_campaign!(campaign.id) == campaign
    end

    test "create_campaign/1 with valid data creates a campaign" do
      system = system_fixture()
      assert {:ok, %Campaign{} = campaign} = CampaignContext.create_campaign(
        @valid_attrs
        |> Enum.into(%{system_id: system.id})
      )
      assert campaign.description == "some description"
      assert campaign.name == "some name"
    end

    test "create_campaign/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CampaignContext.create_campaign(@invalid_attrs)
    end

    test "update_campaign/2 with valid data updates the campaign" do
      system = system_fixture()
      campaign = campaign_fixture(system)
      assert {:ok, campaign} = CampaignContext.update_campaign(
        campaign,
        @update_attrs |> Enum.into(%{system_id: system.id})
      )
      assert %Campaign{} = campaign
      assert campaign.description == "some updated description"
      assert campaign.name == "some updated name"
    end

    test "update_campaign/2 with invalid data returns error changeset" do
      system = system_fixture()
      campaign = campaign_fixture(system)
      assert {:error, %Ecto.Changeset{}} = CampaignContext.update_campaign(campaign, @invalid_attrs)
      assert campaign == CampaignContext.get_campaign!(campaign.id)
    end

    test "delete_campaign/1 deletes the campaign" do
      system = system_fixture()
      campaign = campaign_fixture(system)
      assert {:ok, %Campaign{}} = CampaignContext.delete_campaign(campaign)
      assert_raise Ecto.NoResultsError, fn -> CampaignContext.get_campaign!(campaign.id) end
    end

    test "change_campaign/1 returns a campaign changeset" do
      system = system_fixture()
      campaign = campaign_fixture(system)
      assert %Ecto.Changeset{} = CampaignContext.change_campaign(campaign)
    end
  end
end
