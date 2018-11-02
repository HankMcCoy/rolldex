defmodule Rpgr.CampaignRelationsTest.CampaignRelationsTest do
  use Rpgr.DataCase

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignRelations

  describe "campaign_relations" do
    alias CampaignContext.Noun

    test "get_related_nouns_for_noun/2 doesn't include the noun itself in its results" do
      user = insert(:user)
      campaign = insert(:campaign, created_by: user)

      noun =
        insert(:noun,
          name: "Sword of cool",
          campaign: campaign,
          summary: "This is the Sword of cool"
        )

      insert(:noun,
        name: "Sword of meh",
        campaign: campaign,
        summary: "Not as cool as the Sword of cool"
      )

      noun_list = CampaignRelations.get_related_nouns_for_noun(user.id, noun.id)

      assert length(noun_list) == 1

      assert [
               %Noun{
                 name: "Sword of meh"
               }
             ] = noun_list
    end
  end
end
