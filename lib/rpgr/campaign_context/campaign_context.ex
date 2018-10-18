defmodule Rpgr.CampaignContext do
  @moduledoc """
  The CampaignContext context.
  """

  import Ecto.Query, warn: false
  alias Rpgr.Repo
  alias Rpgr.CampaignContext.Campaign
  alias Rpgr.CampaignContext.Member

  defp validate_can_user_edit_campaign(user_id, campaign_id) do
    with %Campaign{} = campaign <- Repo.get(Campaign, campaign_id) do
      if campaign.created_by_id === user_id do
        :ok
      else
        {:error, :not_authorized}
      end
    end
  end

  defp validate_can_user_view_campaign(user_id, campaign_id) do
    with :ok <- validate_can_user_edit_campaign(user_id, campaign_id) do
      :ok
    else
      _ ->
        with %Member{} <-
               Repo.one(
                 from(
                   m in Member,
                   where: m.campaign_id == ^campaign_id and m.user_id == ^user_id
                 )
               ) do
          :ok
        else
          _ ->
            {:error, :not_authorized}
        end
    end
  end

  # CAMPAIGNS

  defp get_campaigns_for_user_query(user_id) do
    from(
      c in Campaign,
      left_join: m in Member,
      on: c.id == m.campaign_id,
      where: c.created_by_id == ^user_id or m.user_id == ^user_id
    )
  end

  def list_campaigns(user_id) do
    Repo.all(get_campaigns_for_user_query(user_id))
  end

  def get_campaign(user_id, campaign_id) do
    with :ok <- validate_can_user_view_campaign(user_id, campaign_id) do
      Repo.get(Campaign, campaign_id)
    end
  end

  def create_campaign(user_id, attrs \\ %{}) do
    %Campaign{}
    |> Campaign.create_changeset(attrs)
    |> Repo.insert()
  end

  def update_campaign(user_id, %Campaign{} = campaign, attrs) do
    with :ok <- validate_can_user_view_campaign(user_id, campaign.id) do
      campaign
      |> Campaign.update_changeset(attrs)
      |> Repo.update()
    end
  end

  def delete_campaign(user_id, %Campaign{} = campaign) do
    with :ok <- validate_can_user_view_campaign(user_id, campaign.id) do
      Repo.delete(campaign)
    end
  end

  # SESSIONS

  alias Rpgr.CampaignContext.Session

  def list_sessions(user_id, campaign_id) do
    Repo.all(from(s in Session, where: s.campaign_id == ^campaign_id))
  end

  def get_session(user_id, session_id), do: Repo.get(Session, session_id)

  def create_session(user_id, attrs \\ %{}) do
    %Session{}
    |> Session.changeset(attrs)
    |> Repo.insert()
  end

  def update_session(user_id, %Session{} = session, attrs) do
    session
    |> Session.changeset(attrs)
    |> Repo.update()
  end

  def delete_session(user_id, %Session{} = session) do
    Repo.delete(session)
  end

  # NOUNS

  alias Rpgr.CampaignContext.Noun

  defp get_read_only_noun(noun) do
    %{
      noun
      | private_notes: ""
    }
  end

  def list_nouns(user_id, campaign_id) do
    with :ok <- validate_can_user_view_campaign(user_id, campaign_id),
         nouns <- Repo.all(from(n in Noun, where: n.campaign_id == ^campaign_id)) do
      case validate_can_user_edit_campaign(user_id, campaign_id) do
        :ok ->
          nouns

        {:error, :not_authorized} ->
          nouns
          |> Enum.map(&get_read_only_noun/1)
      end
    end
  end

  def get_noun(user_id, noun_id) do
    with noun when not is_nil(noun) <- Repo.get(Noun, noun_id),
         :ok <- validate_can_user_view_campaign(user_id, noun.campaign_id) do
      case validate_can_user_edit_campaign(user_id, noun.campaign_id) do
        :ok -> noun
        {:error, :not_authorized} -> get_read_only_noun(noun)
      end
    end
  end

  def create_noun(user_id, attrs \\ %{}) do
    with :ok <- validate_can_user_edit_campaign(user_id, attrs.campaign_id) do
      %Noun{}
      |> Noun.changeset(attrs)
      |> Repo.insert()
    end
  end

  def update_noun(user_id, %Noun{} = noun, attrs) do
    with :ok <- validate_can_user_edit_campaign(user_id, attrs.campaign_id) do
      noun
      |> Noun.changeset(attrs)
      |> Repo.update()
    end
  end

  def delete_noun(user_id, noun_id) do
    with %Noun{} = noun <- Repo.get(Noun, noun_id),
         :ok <- validate_can_user_edit_campaign(user_id, noun.campaign_id) do
      Repo.delete(noun)
    end
  end

  # Members

  alias Rpgr.CampaignContext.Member

  def list_members(campaign_id) do
    Repo.all(
      from(
        m in Member,
        where: m.campaign_id == ^campaign_id,
        select: m,
        preload: [:user]
      )
    )
  end

  def get_member!(id), do: Repo.get!(Member, id)

  def create_member(attrs \\ %{}) do
    with {:ok, %Member{} = member} <-
           %Member{}
           |> Member.changeset(attrs)
           |> Repo.insert() do
      {:ok, member |> Repo.preload([:user])}
    end
  end

  def delete_member(%Member{} = member) do
    Repo.delete(member)
  end
end
