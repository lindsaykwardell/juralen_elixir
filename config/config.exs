# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :juralen_elixir,
  namespace: Juralen,
  ecto_repos: [Juralen.Repo]

# Configures the endpoint
config :juralen_elixir, JuralenWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "u7Ytmbk2lMnnAOcjktkkLwU4W2gff2/Jg/zd2euuZQVJMDWF4vMAOAKRdA1kd2AU",
  render_errors: [view: JuralenWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Juralen.PubSub,
  live_view: [signing_salt: "GRZ20lHx"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
