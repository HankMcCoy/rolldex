defmodule Rpgr.CampaignRelations do
  @moduledoc """
  Stuff related to relationships between things in campaigns.
  """

  alias Rpgr.Repo
  alias Rpgr.CampaignContext
  import Ecto.Query, warn: false

  def get_nouns_in_session(user_id, session_id) do
    session = Repo.get!(CampaignContext.Session, session_id)
    nouns = CampaignContext.list_nouns(user_id, session.campaign_id)

    Enum.filter(nouns, fn noun ->
      noun_name = String.downcase(noun.name)
      String.downcase(session.summary) =~ noun_name or String.downcase(session.notes) =~ noun_name
    end)
  end

  def get_related_nouns_for_noun(user_id, noun_id) do
    src_noun = Repo.get!(CampaignContext.Noun, noun_id)
    candidate_nouns = CampaignContext.list_nouns(user_id, src_noun.campaign_id)

    Enum.filter(candidate_nouns, fn candidate_noun ->
      candidate_reference_this_noun =
        String.downcase(candidate_noun.summary) =~ String.downcase(src_noun.name) or
          String.downcase(candidate_noun.notes) =~ String.downcase(src_noun.name)

      this_noun_references_candidate =
        String.downcase(src_noun.summary) =~ String.downcase(candidate_noun.name) or
          String.downcase(src_noun.notes) =~ String.downcase(candidate_noun.name)

      candidate_noun.id != noun_id and
        (candidate_reference_this_noun or this_noun_references_candidate)
    end)
  end

  def get_related_sessions_for_noun(user_id, noun_id) do
    src_noun = Repo.get!(CampaignContext.Noun, noun_id)
    noun_name = String.downcase(src_noun.name)
    candidate_sessions = CampaignContext.list_sessions(user_id, src_noun.campaign_id)

    Enum.filter(candidate_sessions, fn session ->
      String.downcase(session.summary) =~ noun_name or String.downcase(session.notes) =~ noun_name
    end)
  end

  ### QUICK filter
  def get_jump_to_results(search, campaign_id) do
    # TODO: https://trello.com/c/RL0RhuvF
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
