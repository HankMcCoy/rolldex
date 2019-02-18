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
        root: "lib/rpgr_web/views",
        namespace: RpgrWeb

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
