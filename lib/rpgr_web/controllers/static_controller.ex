defmodule RpgrWeb.StaticController do
  use RpgrWeb, :controller

  action_fallback(RpgrWeb.FallbackController)

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Application.app_dir(:rpgr, "priv/static/index.html"))
  end
end
