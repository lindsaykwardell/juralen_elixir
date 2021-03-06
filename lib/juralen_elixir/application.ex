defmodule Juralen.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Juralen.Repo,
      # Start the Telemetry supervisor
      JuralenWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Juralen.PubSub},
      # Start the Endpoint (http/https)
      JuralenWeb.Endpoint,
      # Start a worker by calling: Juralen.Worker.start_link(arg)
      # {Juralen.Worker, arg}
      {Absinthe.Subscription, JuralenWeb.Endpoint}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Juralen.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    JuralenWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
