defmodule RpgrWeb.SystemController do
  use RpgrWeb, :controller

  alias Rpgr.SystemContext
  alias Rpgr.SystemContext.System

  action_fallback RpgrWeb.FallbackController

  def index(conn, _params) do
    systems = SystemContext.list_systems()
    render(conn, "index.json", systems: systems)
  end

  def create(conn, %{"system" => system_params}) do
    with {:ok, %System{} = system} <- SystemContext.create_system(system_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", system_path(conn, :show, system))
      |> render("show.json", system: system)
    end
  end

  def show(conn, %{"id" => id}) do
    system = SystemContext.get_system!(id)
    render(conn, "show.json", system: system)
  end

  def update(conn, %{"id" => id, "system" => system_params}) do
    system = SystemContext.get_system!(id)

    with {:ok, %System{} = system} <- SystemContext.update_system(system, system_params) do
      render(conn, "show.json", system: system)
    end
  end

  def delete(conn, %{"id" => id}) do
    system = SystemContext.get_system!(id)
    with {:ok, %System{}} <- SystemContext.delete_system(system) do
      send_resp(conn, :no_content, "")
    end
  end
end
