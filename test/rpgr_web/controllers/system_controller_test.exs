defmodule RpgrWeb.SystemControllerTest do
  use RpgrWeb.ConnCase

  alias Rpgr.SystemContext

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:system) do
    {:ok, system} = SystemContext.create_system(@create_attrs)
    system
  end

  describe "index" do
    test "lists all systems", %{conn: conn} do
      conn = get conn, system_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Systems"
    end
  end

  describe "new system" do
    test "renders form", %{conn: conn} do
      conn = get conn, system_path(conn, :new)
      assert html_response(conn, 200) =~ "New System"
    end
  end

  describe "create system" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, system_path(conn, :create), system: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == system_path(conn, :show, id)

      conn = get conn, system_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show System"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, system_path(conn, :create), system: @invalid_attrs
      assert html_response(conn, 200) =~ "New System"
    end
  end

  describe "edit system" do
    setup [:create_system]

    test "renders form for editing chosen system", %{conn: conn, system: system} do
      conn = get conn, system_path(conn, :edit, system)
      assert html_response(conn, 200) =~ "Edit System"
    end
  end

  describe "update system" do
    setup [:create_system]

    test "redirects when data is valid", %{conn: conn, system: system} do
      conn = put conn, system_path(conn, :update, system), system: @update_attrs
      assert redirected_to(conn) == system_path(conn, :show, system)

      conn = get conn, system_path(conn, :show, system)
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, system: system} do
      conn = put conn, system_path(conn, :update, system), system: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit System"
    end
  end

  describe "delete system" do
    setup [:create_system]

    test "deletes chosen system", %{conn: conn, system: system} do
      conn = delete conn, system_path(conn, :delete, system)
      assert redirected_to(conn) == system_path(conn, :index)
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
