defmodule Juralen.Game do
  alias Juralen.Game.Init
  alias Juralen.Game.Player
  alias Juralen.Accounts

  def create_game() do
    Init.generate_game()
    |> save_game()
  end

  def add_player(uuid, id) do
    get_game!(uuid)
    |> Player.add_player(Accounts.get_user!(id))
    |> save_game()
  end

  def remove_player(uuid, id) do
    get_game!(uuid)
    |> Player.remove_player(id)
    |> save_game()
  end

  def update_settings(uuid, settings) do
    save_game(%{get_game!(uuid) | settings: settings})
  end

  def start_game(uuid) do
    get_game!(uuid)
    |> Init.generate_grid()
    |> save_game()
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

  defp get_game!(uuid) do
    {:ok, conn} = Redix.start_link("redis://localhost:6379")

    case Redix.command(conn, ["GET", uuid]) do
      {:ok, nil} ->
        raise "No game exists"

      {:ok, game} ->
        Jason.decode!(game, keys: :atoms)

      {:error, err} ->
        raise err
    end
  end

  defp save_game(game) do
    {:ok, conn} = Redix.start_link("redis://localhost:6379")

    case Redix.command(conn, ["SET", game[:uuid], Jason.encode!(game)]) do
      {:ok, "OK"} ->
        {:ok, game}

      {:error, val} ->
        {:error, val}
    end
  end
end
