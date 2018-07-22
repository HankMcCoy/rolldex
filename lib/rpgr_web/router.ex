defmodule RpgrWeb.Router do
  use RpgrWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["html", "json"])
    plug(:fetch_session)
  end

  pipeline :authorized do
    plug(
      Guardian.Plug.Pipeline,
      module: Rpgr.Auth.Guardian,
      error_handler: Rpgr.Auth.ErrorHandler
    )

    plug(Guardian.Plug.VerifySession)
    plug(Guardian.Plug.LoadResource)
  end

  scope "/api", RpgrWeb do
    pipe_through(:api)
    resources("/systems", SystemController)

    resources "/campaigns", CampaignController do
      get("/quick-find", QuickFindController, :quick_find)

      resources "/sessions", SessionController, except: [:new, :edit] do
        get("/related-nouns", SessionController, :related_nouns)
      end

      resources "/nouns", NounController, except: [:new, :edit] do
        get("/related-nouns", NounController, :related_nouns)
        get("/related-sessions", NounController, :related_sessions)
      end
    end

    scope "/users" do
      scope "/" do
        post("/sign-in", UserController, :sign_in)
      end

      scope "/" do
        pipe_through(:authorized)

        post("/sign-out", UserController, :sign_out)
        get("/me", UserController, :show)
      end
    end
  end

  scope "/", RpgrWeb do
    pipe_through(:browser)
  end
end
