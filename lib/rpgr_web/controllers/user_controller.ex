defmodule RpgrWeb.UserController do
  use RpgrWeb, :controller
  alias Rpgr.Auth
  alias Rpgr.Auth.User

  action_fallback(RpgrWeb.FallbackController)

  @permitted_emails MapSet.new([
                      "thomas.beirne@gmail.com",
                      "albert@wohletz.net",
                      "brookecosta@gmail.com",
                      "steven.purn@gmail.com",
                      "benjamin.spoon@gmail.com",
                      "david@garrison.net",
                      "dbellgarrison@gmail.com",
                      "alex@panger.org",
                      "bethjohnson3@gmail.com",
                      "samabeken@aol.com",
                      "erin@wohletz.net",
                      "chad.cerruti@gmail.com",
                      "dkenton702@gmail.com",
                      "bobbyjh614@gmail.com",
                      "jakeshasteen@gmail.com"
                    ])

  def register(conn, %{"email" => email, "password" => password}) do
    if MapSet.member?(@permitted_emails, email) do
      with {:ok, %User{} = user} <- Auth.create_user(%{"email" => email, "password" => password}) do
        conn
        |> put_status(:created)
        |> Rpgr.Auth.Guardian.Plug.sign_in(user)
        |> render("show.json", user: user)
      else
        {:error, err} ->
          send_resp(conn, 400, inspect(err))
      end
    else
      send_resp(conn, 400, "Disallowed email")
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Auth.authenticate_user(email, password) do
      conn
      |> Rpgr.Auth.Guardian.Plug.sign_in(user)
      |> send_resp(204, "")
    else
      {:error, _} ->
        send_resp(conn, 400, "Invalid login")
    end
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

    render(conn, "show.json", user: user)
  end
end
