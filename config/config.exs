# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :rpgr,
  ecto_repos: [Rpgr.Repo]

# Configures the endpoint
config :rpgr, RpgrWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "R6u26NtWfnXDNXfWDM5S039HaiKZ9XfA/URamk92JO0tGkyeYIj89u1p00b5ug5j",
  render_errors: [view: RpgrWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Rpgr.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
