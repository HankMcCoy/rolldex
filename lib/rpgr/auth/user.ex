defmodule Rpgr.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Comeonin.Bcrypt
  alias Rpgr.Auth.User

  schema "users" do
    field(:password, :string)
    field(:email, :string)

    timestamps()
  end

  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
    |> put_pass_hash()
  end

  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, password: Bcrypt.hashpwsalt(password))
  end

  defp put_pass_hash(changeset), do: changeset
end
