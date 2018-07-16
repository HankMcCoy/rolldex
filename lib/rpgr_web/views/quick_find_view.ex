defmodule RpgrWeb.QuickFindView do
  use RpgrWeb, :view
  alias RpgrWeb.QuickFindView

  def render("index.json", %{results: results}) do
    IO.puts(inspect(results))
    %{data: render_many(results, QuickFindView, "result.json")}
  end

  def render("result.json", %{quick_find: result}) do
    %{id: result.id, campaign_id: result.campaign_id, name: result.name, source: result.source}
  end
end
