defmodule Rpgr.Mixfile do
  use Mix.Project

  def project do
    [
      app: :rpgr,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Rpgr.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.5.9"},
      {:phoenix_pubsub, "~> 2.0"},
      {:phoenix_ecto, "~> 4.4.0"},
      {:postgrex, "~> 0.15.10"},
      {:phoenix_html, "~> 3.0.3"},
      {:phoenix_live_reload, "~> 1.3.3", only: :dev},
      {:plug_cowboy, "~> 2.0"},
      {:plug, "~> 1.7"},
      {:cors_plug, "~> 2.0.3"},
      {:plug_static_index_html, "~> 1.0"},
      {:ex_machina, "~> 2.7.0", only: :test},
      {:mix_test_watch, "~> 1.1.0", only: :dev, runtime: false},
      {:guardian, "~> 2.2.1"},
      {:bcrypt_elixir, "~> 2.3.0"},
      {:credo, "~> 1.5.6", only: [:dev, :test], runtime: false},
      {:distillery, "~> 2.1.0"},
      { :inflex, "~> 2.1.0" },
      {:jason, "~> 1.0"},
      {:ecto_sql, "~>3.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
