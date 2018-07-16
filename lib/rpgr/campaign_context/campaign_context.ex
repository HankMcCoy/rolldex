defmodule Rpgr.CampaignContext do
  @moduledoc """
  The CampaignContext context.
  """

  import Ecto.Query, warn: false
  alias Rpgr.Repo

  # CAMPAIGNS

  alias Rpgr.CampaignContext.Campaign

  def list_campaigns do
    Repo.all(Campaign)
  end

  def get_campaign!(id), do: Repo.get!(Campaign, id)

  def create_campaign(attrs \\ %{}) do
    %Campaign{}
    |> Campaign.changeset(attrs)
    |> Repo.insert()
  end

  def update_campaign(%Campaign{} = campaign, attrs) do
    campaign
    |> Campaign.changeset(attrs)
    |> Repo.update()
  end

  def delete_campaign(%Campaign{} = campaign) do
    Repo.delete(campaign)
  end

  def change_campaign(%Campaign{} = campaign) do
    Campaign.changeset(campaign, %{})
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

  def change_session(%Session{} = session) do
    Session.changeset(session, %{})
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

  def change_noun(%Noun{} = noun) do
    Noun.changeset(noun, %{})
  end

  # RELATIONS

  def get_nouns_in_session(id) do
    session = Repo.get!(Session, id)
    nouns = list_nouns(session.campaign_id)

    Enum.filter(nouns, fn noun ->
      nounName = String.downcase(noun.name)
      String.downcase(session.summary) =~ nounName or String.downcase(session.notes) =~ nounName
    end)
  end

  def get_related_nouns_for_noun(nounId) do
    src_noun = Repo.get!(Noun, nounId)
    candidateNouns = list_nouns(src_noun.campaign_id)

    Enum.filter(candidateNouns, fn candidateNoun ->
      candidateReferenceThisNoun =
        String.downcase(candidateNoun.description) =~ String.downcase(src_noun.name)

      thisNounReferencesCandidate =
        String.downcase(src_noun.description) =~ String.downcase(candidateNoun.name)

      candidateNoun.id != nounId and (candidateReferenceThisNoun or thisNounReferencesCandidate)
    end)
  end

  def get_related_sessions_for_noun(nounId) do
    src_noun = Repo.get!(Noun, nounId)
    nounName = String.downcase(src_noun.name)
    candidate_sessions = list_sessions(src_noun.campaign_id)

    Enum.filter(candidate_sessions, fn session ->
      String.downcase(session.summary) =~ nounName or String.downcase(session.notes) =~ nounName
    end)
  end

  ### QUICK filter
  def get_jump_to_results(search, campaign_id) do
    IO.puts(inspect({search, campaign_id}))

    %{rows: rows} =
      Ecto.Adapters.SQL.query!(
        Repo,
        """
        SELECT sessions.id, sessions.name, 'SESSION' as source FROM sessions WHERE sessions.name ILIKE $1
          AND sessions.campaign_id = $2
        UNION ALL
        SELECT nouns.id, nouns.name, nouns.noun_type as source FROM nouns WHERE nouns.name ILIKE $1
          AND nouns.campaign_id = $2;
        """,
        ["%#{search}%", campaign_id]
      )

    Enum.map(rows, fn [id, name, source] ->
      %{id: id, name: name, source: source, campaign_id: campaign_id}
    end)
  end
end
