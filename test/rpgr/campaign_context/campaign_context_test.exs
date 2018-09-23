defmodule Rpgr.CampaignContextTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext

  describe "campaigns" do
    alias Rpgr.CampaignContext.Campaign

    test "list_campaigns/0 returns all campaigns" do
      %Campaign{id: id} = insert(:campaign, name: "first campaign", description: "this is first")

      campaignList = CampaignContext.list_campaigns()
      assert length(campaignList) == 1

      assert [
               %Campaign{
                 id: ^id,
                 name: "first campaign",
                 description: "this is first"
               }
             ] = campaignList
    end

    test "get_campaign!/1 returns the campaign with given id" do
      campaign = insert(:campaign, name: "a name", description: "a description")

      %Campaign{id: id} = campaign

      assert %Campaign{
               id: ^id,
               name: "a name",
               description: "a description"
             } = CampaignContext.get_campaign!(id)
    end

    test "create_campaign/1 with valid data creates a campaign" do
      assert {:ok, %Campaign{} = campaign} =
               CampaignContext.create_campaign(%{
                 name: "some name",
                 description: "some description"
               })

      assert campaign.description == "some description"
      assert campaign.name == "some name"
    end

    test "create_campaign/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CampaignContext.create_campaign(%{foo: 3})
    end

    test "update_campaign/2 with valid data updates the campaign" do
      origCampaign = insert(:campaign)

      assert {:ok, campaign} =
               CampaignContext.update_campaign(
                 origCampaign,
                 %{
                   id: origCampaign.id,
                   name: "some updated name",
                   description: "some updated description"
                 }
               )

      assert %Campaign{} = campaign
      assert campaign.description == "some updated description"
      assert campaign.name == "some updated name"
    end

    test "delete_campaign/1 deletes the campaign" do
      campaign = insert(:campaign)
      assert {:ok, %Campaign{}} = CampaignContext.delete_campaign(campaign)
      assert_raise Ecto.NoResultsError, fn -> CampaignContext.get_campaign!(campaign.id) end
    end

    test "change_campaign/1 returns a campaign changeset" do
      campaign = insert(:campaign)
      assert %Ecto.Changeset{} = CampaignContext.change_campaign(campaign)
    end
  end

  describe "relations" do
    alias Rpgr.CampaignContext.Noun

    test "get_nouns_in_session/1 returns relevant nouns" do
      campaign = insert(:campaign)
      insert(:noun, campaign: campaign, name: "Gillian", noun_type: "PERSON")
      insert(:noun, campaign: campaign, name: "Sturm", noun_type: "PLACE")
      insert(:noun, campaign: campaign, name: "Stretchy pants", noun_type: "THING")
      insert(:noun, campaign: campaign, name: "Kulshedra", noun_type: "PERSON")

      session =
        insert(
          :session,
          campaign: campaign,
          summary: """
          Gillian put on the Stretchy pants
          """
        )

      matching_nouns = CampaignContext.get_nouns_in_session(session.id)

      assert length(matching_nouns) == 2
      assert Enum.find(matching_nouns, fn n -> match?(%Noun{name: "Gillian"}, n) end) != nil

      assert Enum.find(matching_nouns, fn n -> match?(%Noun{name: "Stretchy pants"}, n) end) !=
               nil
    end

    test "get_jump_to_results/2 returns relevant objects" do
      campaign = insert(:campaign)
      other_campaign = insert(:campaign)

      # Things that should match
      insert(:noun, campaign: campaign, name: "Sturm", noun_type: "PLACE")
      insert(:noun, campaign: campaign, name: "Kulshedra", noun_type: "PERSON")

      insert(
        :session,
        campaign: campaign,
        name: "Chapter 1: Fun Times"
      )

      # Things that should not match
      insert(:noun, campaign: campaign, name: "Stretchy pants", noun_type: "THING")
      insert(:noun, campaign: campaign, name: "Gillian", noun_type: "PERSON")
      insert(:noun, campaign: other_campaign, name: "Ultra Man", noun_type: "PERSON")

      results = CampaignContext.get_jump_to_results("u", campaign.id)

      assert length(results) == 3

      assert Enum.find(results, fn n -> match?(%{name: "Sturm", source: "PLACE"}, n) end) != nil

      assert Enum.find(results, fn n ->
               match?(%{name: "Kulshedra", source: "PERSON"}, n)
             end) != nil

      assert Enum.find(results, fn n ->
               match?(%{name: "Chapter 1: Fun Times", source: "SESSION"}, n)
             end) != nil
    end
  end
end
