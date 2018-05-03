defmodule RpgrWeb.CampaignControllerTest do
  use RpgrWeb.ConnCase

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Campaign
  alias Rpgr.SystemContext
  alias Rpgr.SystemContext.System

  @create_attrs %{description: "some description", name: "some name"}
  @update_attrs %{description: "some updated description", name: "some updated name"}
  @invalid_attrs %{description: nil, name: nil, system_id: nil}

  def fixture(:campaign, system) do
    {:ok, campaign} = CampaignContext.create_campaign(
      @create_attrs
      |> Enum.into(%{ system_id: system.id })
    )
    campaign
  end

  def fixture(:system) do
    {:ok, system} = SystemContext.create_system(@create_attrs)
    system
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all campaigns", %{conn: conn} do
      conn = get conn, campaign_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create campaign" do
    test "renders campaign when data is valid", %{conn: conn} do
      system = fixture(:system)
      conn = post(
        conn,
        campaign_path(conn, :create),
        campaign: @create_attrs |> Enum.into(%{system_id: system.id})
      )
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, campaign_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some description",
        "name" => "some name",
        "system_id" => system.id
      }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, campaign_path(conn, :create), campaign: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update campaign" do
    setup [:create_campaign]

    test "renders campaign when data is valid", %{conn: conn, campaign: %Campaign{id: id, system_id: system_id} = campaign} do
      conn = put conn, campaign_path(conn, :update, campaign), campaign: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, campaign_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some updated description",
        "name" => "some updated name",
        "system_id" => system_id}
    end

    test "renders errors when data is invalid", %{conn: conn, campaign: campaign} do
      conn = put conn, campaign_path(conn, :update, campaign), campaign: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete campaign" do
    setup [:create_campaign]

    test "deletes chosen campaign", %{conn: conn, campaign: campaign} do
      conn = delete conn, campaign_path(conn, :delete, campaign)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, campaign_path(conn, :show, campaign)
      end
    end
  end

  defp create_campaign(_) do
    system = fixture(:system)
    campaign = fixture(:campaign, system)
    {:ok, campaign: campaign}
  end
end
