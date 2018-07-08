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
    plug :accepts, ["html", "json"]
  end

  scope "/api", RpgrWeb do
    pipe_through :api
    resources "/systems", SystemController
    resources "/campaigns", CampaignController do
      resources "/sessions", SessionController, except: [:new, :edit] do
        get "/related-nouns", SessionController, :related_nouns
      end
      resources "/nouns", NounController, except: [:new, :edit] do
        get "/related-nouns", NounController, :related_nouns
      end
    end
  end

  scope "/", RpgrWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
