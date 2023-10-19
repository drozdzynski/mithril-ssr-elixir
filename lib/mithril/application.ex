defmodule Mithril.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      MithrilWeb.Telemetry,
      # Start the Ecto repository
      Mithril.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Mithril.PubSub},
      # Start Finch
      {Finch, name: Mithril.Finch},
      # Start the Endpoint (http/https)
      MithrilWeb.Endpoint,
      # Start a worker by calling: Mithril.Worker.start_link(arg)
      # {Mithril.Worker, arg}
      %{
        id: NodeJS,
        start: {NodeJS, :start_link, [[path: "/Volumes/Projects/test/mithril-phoenix/mithril/assets", pool_size: 4]]}
      }
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Mithril.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    MithrilWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
