defmodule Juralen.Game do
  alias Juralen.Game.Init
  alias Juralen.Game.Player
  alias Juralen.Game.Settings
  alias Juralen.Accounts

  def create_game(user, name) do
    Init.generate_game()
    |> Settings.update_settings(%{Settings.generate_settings() | name: name})
    |> Player.add_player(user)
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
    get_game!(uuid)
    |> Settings.update_settings(settings)
    |> save_game()
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
        Absinthe.Subscription.publish(JuralenWeb.Endpoint, game, updated_game: game[:uuid])
        {:ok, game}

      {:error, val} ->
        {:error, val}
    end
  end
end
