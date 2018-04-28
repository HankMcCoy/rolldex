defmodule RpgrWeb.SystemControllerTest do
  use RpgrWeb.ConnCase

  alias Rpgr.SystemContext
  alias Rpgr.SystemContext.System

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:system) do
    {:ok, system} = SystemContext.create_system(@create_attrs)
    system
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all systems", %{conn: conn} do
      conn = get conn, system_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create system" do
    test "renders system when data is valid", %{conn: conn} do
      conn = post conn, system_path(conn, :create), system: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, system_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, system_path(conn, :create), system: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update system" do
    setup [:create_system]

    test "renders system when data is valid", %{conn: conn, system: %System{id: id} = system} do
      conn = put conn, system_path(conn, :update, system), system: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, system_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, system: system} do
      conn = put conn, system_path(conn, :update, system), system: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete system" do
    setup [:create_system]

    test "deletes chosen system", %{conn: conn, system: system} do
      conn = delete conn, system_path(conn, :delete, system)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, system_path(conn, :show, system)
      end
    end
  end

  defp create_system(_) do
    system = fixture(:system)
    {:ok, system: system}
  end
end
