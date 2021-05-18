defmodule Juralen.Cache do
  def connect! do
    case Redix.start_link(System.get_env("REDIS_URL") || "redis://localhost:6379") do
      {:ok, conn} ->
        conn
      _ ->
        raise "Unable to connect to Redis"
    end
  end

  def set(key, val) do
    connect!()
    |> Redix.command(["SET", key, val])
  end

  def get(key) do
    connect!()
    |> Redix.command(["GET", key])
  end

  def get!(key) do
    connect!()
    |> Redix.command!(["GET", key])
  end
end
