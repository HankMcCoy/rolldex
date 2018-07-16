defmodule RpgrWeb.QuickFindController do
  use RpgrWeb, :controller

  alias Rpgr.CampaignContext
  alias Rpgr.CampaignContext.Noun

  action_fallback(RpgrWeb.FallbackController)

  def quick_find(conn, %{"noun" => noun_params}) do
    with {:ok, %Noun{} = noun} <- CampaignContext.create_noun(noun_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", campaign_noun_path(conn, :show, noun.campaign_id, noun.id))
      |> render("show.json", noun: noun)
    end
  end
end
