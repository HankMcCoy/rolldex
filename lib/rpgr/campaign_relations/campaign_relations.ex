defmodule Rpgr.CampaignRelations do
  @moduledoc """
  Stuff related to relationships between things in campaigns.
  """

  alias Rpgr.Repo
  alias Rpgr.CampaignContext
  import Ecto.Query, warn: false

  def get_nouns_in_session(id) do
    session = Repo.get!(CampaignContext.Session, id)
    nouns = CampaignContext.list_nouns(session.campaign_id)

    Enum.filter(nouns, fn noun ->
      noun_name = String.downcase(noun.name)
      String.downcase(session.summary) =~ noun_name or String.downcase(session.notes) =~ noun_name
    end)
  end

  def get_related_nouns_for_noun(nounId) do
    src_noun = Repo.get!(CampaignContext.Noun, nounId)
    candidate_nouns = CampaignContext.list_nouns(src_noun.campaign_id)

    Enum.filter(candidate_nouns, fn candidate_noun ->
      candidate_reference_this_noun =
        String.downcase(candidate_noun.summary) =~ String.downcase(src_noun.name) or
          String.downcase(candidate_noun.notes) =~ String.downcase(src_noun.name)

      this_noun_references_candidate =
        String.downcase(src_noun.summary) =~ String.downcase(candidate_noun.name) or
          String.downcase(src_noun.notes) =~ String.downcase(candidate_noun.name)

      candidate_noun.id != nounId and
        (candidate_reference_this_noun or this_noun_references_candidate)
    end)
  end

  def get_related_sessions_for_noun(nounId) do
    src_noun = Repo.get!(CampaignContext.Noun, nounId)
    noun_name = String.downcase(src_noun.name)
    candidate_sessions = CampaignContext.list_sessions(src_noun.campaign_id)

    Enum.filter(candidate_sessions, fn session ->
      String.downcase(session.summary) =~ noun_name or String.downcase(session.notes) =~ noun_name
    end)
  end

  ### QUICK filter
  def get_jump_to_results(search, campaign_id) do
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
