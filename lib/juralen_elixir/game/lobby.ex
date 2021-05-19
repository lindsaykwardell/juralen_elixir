defmodule Juralen.Game.Lobby do
  alias Juralen.Cache
  alias Juralen.Game.ActiveGames

  def join_lobby do
    # Absinthe.Subscription.publish(JuralenWeb.Endpoint, fetch_game_queue(),
    #   game_queue: "game_queue"
    # )

    {:ok, "OK"}
  end

  def add_game(uuid) do
    Cache.get("game_queue")
    |> case do
      {:ok, nil} ->
        update_game_queue([uuid])

      {:ok, game_queue} ->
        prev_game_queue = Jason.decode!(game_queue, keys: :atoms)

        case Enum.find(prev_game_queue, fn existing_game ->
               uuid == existing_game
             end) do
          nil ->
            [uuid | prev_game_queue]

          _ ->
            prev_game_queue
        end
        |> update_game_queue()

      _ ->
        update_game_queue([uuid])
    end
  end

  def remove_game(uuid) do
    Cache.get("game_queue")
    |> case do
      {:ok, nil} ->
        update_game_queue([])

      {:ok, game_queue} ->
        Jason.decode!(game_queue, keys: :atoms)
        |> Enum.filter(fn existing_game ->
          uuid !== existing_game
        end)
        |> update_game_queue()

      _ ->
        update_game_queue([])
    end
  end

  defp update_game_queue(game_queue) do
    case Cache.set("game_queue", Jason.encode!(game_queue)) do
      {:ok, _} ->
        Absinthe.Subscription.publish(JuralenWeb.Endpoint, fetch_game_queue(game_queue),
          game_queue: "game_queue"
        )

        {:ok, game_queue}

      {:error, err} ->
        {:error, err}
    end
  end

  def fetch_game_queue() do
    case Cache.get("game_queue") do
      {:ok, nil} ->
        []

      {:ok, game_queue} ->
        game_queue
        |> Jason.decode!(keys: :atoms)
        |> fetch_game_queue()

      {:error, err} ->
        raise err
    end
  end

  defp fetch_game_queue(game_queue) do
    case length(game_queue) do
      0 ->
        []

      _ ->
        head = hd(game_queue)

        if head == nil, do: []

        case ActiveGames.get_game(head) do
          {:ok, game} ->
            fetch_game_queue(tl(game_queue), [game])

          {:error, _} ->
            remove_game(head)
            fetch_game_queue(tl(game_queue), [])
        end
    end
  end

  defp fetch_game_queue(game_queue, games) do
    case length(game_queue) do
      0 ->
        games

      _ ->
        head = hd(game_queue)

        if head == nil, do: games

        case ActiveGames.get_game(head) do
          {:ok, game} ->
            fetch_game_queue(tl(game_queue), [game | games])

          {:error, _} ->
            remove_game(head)
            fetch_game_queue(tl(game_queue), games)
        end
    end
  end
end
