defmodule RpgrWeb do
  def controller do
    quote do
      use Phoenix.Controller, namespace: RpgrWeb
      import Plug.Conn
      import RpgrWeb.Router.Helpers
      import RpgrWeb.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View,
        root: "lib/rpgr_web/templates",
        namespace: RpgrWeb

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import RpgrWeb.Router.Helpers
      import RpgrWeb.ErrorHelpers
      import RpgrWeb.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import RpgrWeb.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
