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
    conn = connect!()
    res = Redix.command(conn, ["SET", key, val])
    Redix.stop(conn)

    res
  end

  def get(key) do
    conn = connect!()
    res = Redix.command(conn, ["GET", key])
    Redix.stop(conn)

    res
  end

  def get!(key) do
    conn = connect!()
    res = Redix.command!(conn, ["GET", key])
    Redix.stop(conn)

    res
  end

  def delete(key) do
    conn = connect!()
    res = Redix.command(conn, ["DEL", "KEY", key])
    Redix.stop(conn)

    res
  end
end
