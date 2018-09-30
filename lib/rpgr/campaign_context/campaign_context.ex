defmodule Rpgr.CampaignContext do
  @moduledoc """
  The CampaignContext context.
  """

  import Ecto.Query, warn: false
  alias Rpgr.Repo

  # CAMPAIGNS

  alias Rpgr.CampaignContext.Campaign

  def list_campaigns(user_id) do
    Repo.all(from(c in Campaign, where: c.created_by_id == ^user_id))
  end

  def get_campaign!(id, user_id), do: Repo.get_by!(Campaign, id: id, created_by_id: user_id)

  def create_campaign(attrs \\ %{}) do
    %Campaign{}
    |> Campaign.create_changeset(attrs)
    |> Repo.insert()
  end

  def update_campaign(%Campaign{} = campaign, attrs) do
    campaign
    |> Campaign.update_changeset(attrs)
    |> Repo.update()
  end

  def delete_campaign(%Campaign{} = campaign) do
    Repo.delete(campaign)
  end

  # SESSIONS

  alias Rpgr.CampaignContext.Session

  def list_sessions(campaign_id) do
    Repo.all(from(s in Session, where: s.campaign_id == ^campaign_id))
  end

  def get_session!(id), do: Repo.get!(Session, id)

  def create_session(attrs \\ %{}) do
    %Session{}
    |> Session.changeset(attrs)
    |> Repo.insert()
  end

  def update_session(%Session{} = session, attrs) do
    session
    |> Session.changeset(attrs)
    |> Repo.update()
  end

  def delete_session(%Session{} = session) do
    Repo.delete(session)
  end

  # NOUNS

  alias Rpgr.CampaignContext.Noun

  def list_nouns(campaign_id) do
    Repo.all(from(n in Noun, where: n.campaign_id == ^campaign_id))
  end

  def get_noun!(id), do: Repo.get!(Noun, id)

  def create_noun(attrs \\ %{}) do
    %Noun{}
    |> Noun.changeset(attrs)
    |> Repo.insert()
  end

  def update_noun(%Noun{} = noun, attrs) do
    noun
    |> Noun.changeset(attrs)
    |> Repo.update()
  end

  def delete_noun(%Noun{} = noun) do
    Repo.delete(noun)
  end

  # Members

  alias Rpgr.CampaignContext.Member

  def list_members(campaign_id) do
    Repo.all(
      from(
        m in Member,
        where: m.campaign_id == ^campaign_id,
        select: m
      )
    )
  end

  def get_member!(id), do: Repo.get!(Member, id)

  def create_member(attrs \\ %{}) do
    %Member{}
    |> Member.changeset(attrs)
    |> Repo.insert()
  end

  def delete_member(%Member{} = member) do
    Repo.delete(member)
  end
end
