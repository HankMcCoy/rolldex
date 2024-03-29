defmodule Rpgr.Auth do
  import Ecto.Query, warn: false
  alias Rpgr.Repo

  alias Rpgr.Auth.User

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_email(email) do
    query = from(u in User, where: u.email == ^email)

    query
    |> Repo.one()
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  def authenticate_user(email, plain_text_password) do
    get_user_by_email(email)
    |> check_password(plain_text_password)
  end

  defp check_password(nil, _), do: {:error, "Incorrect email or password"}

  defp check_password(user, plain_text_password) do
    case Bcrypt.verify_pass(plain_text_password, user.password) do
      true -> {:ok, user}
      false -> {:error, "Incorrect email or password"}
    end
  end
end
