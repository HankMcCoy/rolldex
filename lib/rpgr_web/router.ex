defmodule RpgrWeb.Router do
  use RpgrWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", RpgrWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    resources "/systems", SystemController
  end

  # Other scopes may use custom stacks.
  # scope "/api", RpgrWeb do
  #   pipe_through :api
  # end
end
