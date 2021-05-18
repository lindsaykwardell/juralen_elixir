defmodule Juralen.Game.Lobby do
  alias Juralen.Cache
  alias Juralen.Game.ActiveGames

  def add_game(uuid) do
    Cache.get("lobby")
    |> case do
      {:ok, nil} ->
        update_lobby([uuid])

      {:ok, lobby} ->
        prev_lobby = Jason.decode!(lobby, keys: :atoms)

        case Enum.find(prev_lobby, fn existing_game ->
               uuid == existing_game
             end) do
          nil ->
            [uuid | prev_lobby]

          _ ->
            prev_lobby
        end
        |> update_lobby()

      _ ->
        update_lobby([uuid])
    end
  end

  def remove_game(uuid) do
    Cache.get("lobby")
    |> case do
      {:ok, nil} ->
        update_lobby([])

      {:ok, lobby} ->
        Jason.decode!(lobby, keys: :atoms)
        |> Enum.filter(fn existing_game ->
          uuid !== existing_game
        end)
        |> update_lobby()

      _ ->
        update_lobby([])
    end
  end

  defp update_lobby(lobby) do
    case Cache.set("lobby", Jason.encode!(lobby)) do
      {:ok, _} ->
        Absinthe.Subscription.publish(JuralenWeb.Endpoint, fetch_lobby(lobby), lobby: "lobby")
        {:ok, lobby}

      {:error, err} ->
        {:error, err}
    end
  end

  def fetch_lobby() do
    Cache.get!("lobby")
    |> Jason.decode!()
    |> fetch_lobby()
  end

  defp fetch_lobby(lobby) do
    if length(lobby) == 0, do: []

    [head | tail] = lobby

    if head == nil, do: []

    case ActiveGames.get_game(head) do
      {:ok, game} ->
        fetch_lobby(tail, [game])

      {:error, _} ->
        remove_game(head)
        fetch_lobby(tail, [])
    end
  end

  defp fetch_lobby(lobby, games) do
    case length(lobby) do
      0 ->
        games

      _ ->
        head = hd(lobby)

        if head == nil, do: games

        case ActiveGames.get_game(head) do
          {:ok, game} ->
            fetch_lobby(tl(lobby), [game | games])

          {:error, _} ->
            remove_game(head)
            fetch_lobby(tl(lobby), games)
        end
    end
  end
end
