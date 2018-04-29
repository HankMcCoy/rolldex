defmodule RpgrWeb.SystemView do
  use RpgrWeb, :view
  alias RpgrWeb.SystemView

  def render("index.json", %{systems: systems}) do
    %{data: render_many(systems, SystemView, "system.json")}
  end

  def render("show.json", %{system: system}) do
    %{data: render_one(system, SystemView, "system.json")}
  end

  def render("system.json", %{system: system}) do
    %{id: system.id, name: system.name, description: system.description}
  end
end
