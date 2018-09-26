use Mix.Config

# Do not print debug messages in production
config :logger, level: :debug

config :rpgr, RpgrWeb.Endpoint,
  load_from_system_env: true,
  # Without this line, your app will not start the web server!
  server: true,
  secret_key_base: "${SECRET_KEY_BASE}",
  url: [host: "rolldex.app", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

config :rpgr, Rpgr.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: "${DATABASE_URL}",
  database: "",
  ssl: true,
  # Free tier db only allows 2 connections. Rolling deploys need n+1 connections. Also, save one for psql, jobs, etc.
  pool_size: 1

config :rpgr, Rpgr.Auth.Guardian,
  issuer: "rpgr",
  secret_key: "${GUARDIAN_ROLLDEX_SECRET_KEY}"
