defmodule RpgrWeb.CampaignControllerTest do
  use RpgrWeb.ConnCase

  alias Rpgr.CampaignContext.Campaign

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all campaigns", %{conn: conn} do
      conn = get(conn, campaign_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create campaign" do
    test "renders campaign when data is valid", %{conn: conn} do
      system = insert(:system)

      conn =
        post(
          conn,
          campaign_path(conn, :create),
          campaign: %{
            name: "some name",
            description: "some description",
            system_id: system.id
          }
        )

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, campaign_path(conn, :show, id))
      system_id = system.id

      assert %{
               "id" => ^id,
               "description" => "some description",
               "name" => "some name",
               "system_id" => ^system_id,
               "inserted_at" => _,
               "updated_at" => _
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, campaign_path(conn, :create), campaign: %{description: nil})
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update campaign" do
    setup [:create_campaign]

    test "renders campaign when data is valid", %{
      conn: conn,
      campaign: %Campaign{id: id, system_id: system_id} = campaign
    } do
      conn =
        put(
          conn,
          campaign_path(conn, :update, campaign),
          campaign: %{name: "updated name", description: "updated description"}
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, campaign_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "description" => "updated description",
               "name" => "updated name",
               "system_id" => ^system_id,
               "inserted_at" => _,
               "updated_at" => _
             } = json_response(conn, 200)["data"]
    end
  end

  describe "delete campaign" do
    setup [:create_campaign]

    test "deletes chosen campaign", %{conn: conn, campaign: campaign} do
      conn = delete(conn, campaign_path(conn, :delete, campaign))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, campaign_path(conn, :show, campaign))
      end)
    end
  end

  defp create_campaign(_) do
    system = insert(:system)
    campaign = insert(:campaign, system: system)
    {:ok, campaign: campaign}
  end
end
