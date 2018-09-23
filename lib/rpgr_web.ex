defmodule RpgrWeb do
  def controller do
    quote do
      use Phoenix.Controller, namespace: RpgrWeb
      import Plug.Conn
      import RpgrWeb.Router.Helpers

      defp get_user(conn) do
        Rpgr.Auth.Guardian.Plug.current_resource(conn)
      end
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

      import RpgrWeb.ErrorHelpers
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
