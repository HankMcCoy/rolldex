defmodule Rpgr.CampaignContextTest.NounsTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext
  alias Rpgr.Auth

  describe "nouns" do
    alias CampaignContext.Campaign
    alias CampaignContext.Noun
    alias Auth.User

    test "list_nouns/2 returns full nouns for campaigns where the current user is the admin" do
      user = insert(:user)
      campaign = insert(:campaign, created_by: user)
      noun = insert(:noun, name: "Sword of cool", campaign: campaign)

      noun_list = CampaignContext.list_nouns(user.id, campaign.id)
      assert length(noun_list) == 1

      %User{id: user_id} = user

      assert [
               %Noun{
                 name: "Sword of cool"
               }
             ] = noun_list
    end

    test "list_nouns/2 hides private notes for readonly members" do
      campaign = insert(:campaign)
      member = insert(:member, campaign: campaign)

      noun =
        insert(
          :noun,
          name: "Sword of cool",
          summary: "A sword",
          notes: "It is great",
          private_notes: "It is _not_ great",
          campaign: campaign
        )

      noun_list = CampaignContext.list_nouns(member.user_id, campaign.id)
      assert length(noun_list) == 1

      assert [
               %Noun{
                 name: "Sword of cool",
                 summary: "A sword",
                 notes: "It is great",
                 private_notes: ""
               }
             ] = noun_list
    end

    test "get_noun/2 returns a note" do
      user = insert(:user)
      campaign = insert(:campaign, created_by: user)

      noun =
        insert(
          :noun,
          name: "Clasp of awesome",
          summary: "A clasp",
          notes: "It turns into a boat",
          private_notes: "The boat is cursed",
          campaign: campaign
        )

      result = CampaignContext.get_noun(user.id, noun.id)

      assert %Noun{
               name: "Clasp of awesome",
               summary: "A clasp",
               notes: "It turns into a boat",
               private_notes: "The boat is cursed"
             } = result
    end

    test "get_noun/2 hides private notes for readonly members" do
      campaign = insert(:campaign)
      member = insert(:member, campaign: campaign)

      noun =
        insert(
          :noun,
          name: "Clasp of awesome",
          summary: "A clasp",
          notes: "It turns into a boat",
          private_notes: "The boat is cursed",
          campaign: campaign
        )

      result = CampaignContext.get_noun(member.user_id, noun.id)

      assert %Noun{
               name: "Clasp of awesome",
               summary: "A clasp",
               notes: "It turns into a boat",
               private_notes: ""
             } = result
    end
  end
end
