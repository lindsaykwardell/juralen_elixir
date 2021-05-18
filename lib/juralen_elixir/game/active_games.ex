defmodule Juralen.Game.ActiveGames do
  alias Juralen.Cache
  alias Juralen.Game.Lobby

  def get_game(uuid) do
    case Cache.get(uuid) do
      {:ok, nil} ->
        {:error, "No game exists"}

      {:ok, game} ->
        {:ok, Jason.decode!(game, keys: :atoms)}

      {:error, err} ->
        {:error, err}
    end
  end

  def get_game!(uuid) do
    case Cache.get(uuid) do
      {:ok, nil} ->
        raise "No game exists"

      {:ok, game} ->
        Jason.decode!(game, keys: :atoms)

      {:error, err} ->
        raise err
    end
  end

  def update_game(game) do
    case Cache.set(game[:uuid], Jason.encode!(game)) do
      {:ok, "OK"} ->
        Absinthe.Subscription.publish(JuralenWeb.Endpoint, game, updated_game: game[:uuid])
        Lobby.add_game(game[:uuid])
        {:ok, game}

      {:error, err} ->
        raise err
    end
  end
end
