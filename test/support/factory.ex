defmodule Rpgr.Factory do
  use ExMachina.Ecto, repo: Rpgr.Repo
  alias Rpgr.CampaignContext.Campaign
  alias Rpgr.CampaignContext.Session
  alias Rpgr.CampaignContext.Noun
  alias Rpgr.CampaignContext.Member
  alias Rpgr.Auth.User

  def user_factory do
    %User{
      email: sequence(:email, &"test.user.#{&1}@gmail.com"),
      password: "FAKE PASSWORD"
    }
  end

  def campaign_factory do
    %Campaign{
      name: sequence(:name, &"Campaign #{&1}"),
      description: sequence(:description, &"Description of campaign #{&1}"),
      created_by: build(:user)
    }
  end

  def session_factory do
    %Session{
      name: sequence(:name, &"Ch #{&1}"),
      summary: sequence(:description, &"Description of ch #{&1}"),
      notes: """
      \# The plan

      They will discover the secret lair.

      \# What actually happened

      They went shopping for four hours. AND DIDN'T BUY ANYTHING.
      """,
      campaign: build(:campaign)
    }
  end

  def noun_factory do
    %Noun{
      name: sequence(:name, ["Rod of wonder", "Kulshedra", "Sturm"]),
      noun_type: sequence(:noun_type, ["THING", "PERSON", "PLACE"]),
      summary: "An interesting noun",
      notes: "**Cool** _notes_",
      campaign: build(:campaign)
    }
  end

  def member_factory do
    %Member{
      member_type: "READ_ONLY",
      user: build(:user),
      campaign: build(:campaign)
    }
  end
end
