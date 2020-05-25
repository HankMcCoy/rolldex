# Rolldex


A system for keeping notes on tabletop RPG campaigns.

## Local dev prep

### Global dependencies
- Install PostgreSQL (I'd recommend using [Homebrew](https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql/))
- Install [Node](https://nodejs.org/en/download/package-manager/)
- Install [Elixir](https://elixir-lang.org/install.html)

### Database setup
1. Switch to the default postgres user: `sudo -u postgres -i`
1. Follow the [instructions here](https://www.freecodecamp.org/news/how-to-get-started-with-postgresql-9d3bc1dd1b11/) for getting a basic Postgres DB setup, just make sure to name the database "rpgr_dev".
1. `mix ecto.setup`

### Secrets
1. Under `./config` add `dev.secret.exs` and `test.secret.exs` file with the following contents:
```ex
use Mix.Config

config :rpgr, Rpgr.Repo,
adapter: Ecto.Adapters.Postgres,
username: "<ADD THE USERNAME YOU ARE USING FOR YOUR LOCAL POSTGRES INSTANCE HERE>",
password: "<ADD THE PASSWORD YOU SET UP HERE>",
database: "rpgr_<EITHER dev OR test TO MATCH THE FILE>",
hostname: "localhost",
pool_size: 10
```
2. Add `GUARDIAN_ROLLDEX_SECRET_KEY` to your `zshrc`/`bashrc` file (not sure if it needs to be something specific or not...)

### Local Dependencies
- Run `mix deps.get` and allow it to install Hex when prompted
- Navigate to `./priv/assets` and run `npm install`

## Local dev
- From the root `rolldex` directory run `mix phx.server`
- In a different terminal, navigate to the `./priv/assets` directory and run `npm start`
- Go to http://localhost:3000
  - If this is your first time running it, go to the [register](http://localhost:3000/register) page and sign up with your email (note: it must be approved).

## Deployment
If you aren't me you probably don't have authorization to deploy. So maybe just ask me to deploy.

### Prep
1. Install [Python3 & Pip3](https://docs.python-guide.org/starting/install3/osx/)
1. Install the [Gigalixir CLI](https://gigalixir.readthedocs.io/en/latest/main.html#install-the-command-line-interface)
1. Run `gigalixir login`
1. gigalixir git:remote <GIGALIXIR_APP_NAME>

### How to deploy
1. `git push gigalixir master`
1. Wait as it takes a long time to build
