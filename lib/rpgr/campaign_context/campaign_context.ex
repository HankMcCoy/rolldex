defmodule Rpgr.CampaignContext do
  @moduledoc """
  The CampaignContext context.
  """

  import Ecto.Query, warn: false
  alias Rpgr.Repo

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

  alias Rpgr.CampaignContext.Session

  @doc """
  Returns the list of sessions.

  ## Examples

      iex> list_sessions()
      [%Session{}, ...]

  """
  def list_sessions do
    Repo.all(Session)
  end

  @doc """
  Gets a single session.

  Raises `Ecto.NoResultsError` if the Session does not exist.

  ## Examples

      iex> get_session!(123)
      %Session{}

      iex> get_session!(456)
      ** (Ecto.NoResultsError)

  """
  def get_session!(id), do: Repo.get!(Session, id)

  @doc """
  Creates a session.

  ## Examples

      iex> create_session(%{field: value})
      {:ok, %Session{}}

      iex> create_session(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_session(attrs \\ %{}) do
    %Session{}
    |> Session.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a session.

  ## Examples

      iex> update_session(session, %{field: new_value})
      {:ok, %Session{}}

      iex> update_session(session, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_session(%Session{} = session, attrs) do
    session
    |> Session.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Session.

  ## Examples

      iex> delete_session(session)
      {:ok, %Session{}}

      iex> delete_session(session)
      {:error, %Ecto.Changeset{}}

  """
  def delete_session(%Session{} = session) do
    Repo.delete(session)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking session changes.

  ## Examples

      iex> change_session(session)
      %Ecto.Changeset{source: %Session{}}

  """
  def change_session(%Session{} = session) do
    Session.changeset(session, %{})
  end
end
