defmodule Juralen.Game do
  alias Juralen.Game.Init

  def create_game(max_x, max_y) do
    {:ok, conn} = Redix.start_link("redis://localhost:6379")
    uuid = UUID.uuid4()
    grid = Init.generate(max_x, max_y)
    game = %{uuid: uuid, grid: grid}

    case Redix.command(conn, ["SET", uuid, Jason.encode!(game)]) do
      {:ok, "OK"} ->
        {:ok, game}

      {:error, val} ->
        {:error, val}
    end
  end

  def get_game(uuid) do
    {:ok, conn} = Redix.start_link("redis://localhost:6379")

    case Redix.command(conn, ["GET", uuid]) do
      {:ok, nil} ->
        {:error, "No game exists"}

      {:ok, game} ->
        {:ok, Jason.decode!(game, keys: :atoms)}

      {:error, err} ->
        {:error, err}
    end
  end
end
