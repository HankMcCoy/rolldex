defmodule RpgrWeb.QuickFindController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignRelations

  action_fallback(RpgrWeb.FallbackController)

  def quick_find(conn, %{"campaign_id" => campaign_id}) do
    {campaign_id, _} = Integer.parse(campaign_id)
    conn = fetch_query_params(conn)
    %{"q" => search} = conn.query_params
    results = CampaignRelations.get_jump_to_results(search, campaign_id)

    conn
    |> put_status(:ok)
    |> render("index.json", results: results)
  end
end
