defmodule RpgrWeb.UserController do
  use RpgrWeb, :controller

  def sign_in(conn, %{"password" => "password"}) do
    user = %{id: "1"}

    conn
    |> Rpgr.Auth.Guardian.Plug.sign_in(user)
    |> send_resp(204, "")
  end

  def sign_in(conn, _params) do
    send_resp(conn, 401, Poison.encode!(%{error: "Incorrect password"}))
  end

  def sign_out(conn, _params) do
    conn
    |> Rpgr.Auth.Guardian.Plug.sign_out()
    |> send_resp(204, "")
  end

  def show(conn, _params) do
    user = Rpgr.Auth.Guardian.Plug.current_resource(conn)

    send_resp(conn, 200, Poison.encode!(%{user: user}))
  end
end
