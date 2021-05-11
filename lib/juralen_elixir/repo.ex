defmodule Juralen.Repo do
  use Ecto.Repo,
    otp_app: :juralen_elixir,
    adapter: Ecto.Adapters.Postgres
end
