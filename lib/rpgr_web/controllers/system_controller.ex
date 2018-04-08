defmodule RpgrWeb.SystemController do
  use RpgrWeb, :controller

  alias Rpgr.SystemContext
  alias Rpgr.SystemContext.System

  def index(conn, _params) do
    systems = SystemContext.list_systems()
    render(conn, "index.html", systems: systems)
  end

  def new(conn, _params) do
    changeset = SystemContext.change_system(%System{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"system" => system_params}) do
    case SystemContext.create_system(system_params) do
      {:ok, system} ->
        conn
        |> put_flash(:info, "System created successfully.")
        |> redirect(to: system_path(conn, :show, system))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    system = SystemContext.get_system!(id)
    render(conn, "show.html", system: system)
  end

  def edit(conn, %{"id" => id}) do
    system = SystemContext.get_system!(id)
    changeset = SystemContext.change_system(system)
    render(conn, "edit.html", system: system, changeset: changeset)
  end

  def update(conn, %{"id" => id, "system" => system_params}) do
    system = SystemContext.get_system!(id)

    case SystemContext.update_system(system, system_params) do
      {:ok, system} ->
        conn
        |> put_flash(:info, "System updated successfully.")
        |> redirect(to: system_path(conn, :show, system))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", system: system, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    system = SystemContext.get_system!(id)
    {:ok, _system} = SystemContext.delete_system(system)

    conn
    |> put_flash(:info, "System deleted successfully.")
    |> redirect(to: system_path(conn, :index))
  end
end
