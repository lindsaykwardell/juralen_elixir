defmodule JuralenWeb.Schema.LobbySchema do
  use Absinthe.Schema.Notation

  object :lobby_mutations do
    field :join_lobby, :string do
      resolve(&JuralenWeb.LobbyResolver.join_lobby/3)
    end
  end

  object :lobby_subscriptions do
    field :game_queue, list_of(:game) do
      config(fn _args, _ ->
        {:ok, topic: "game_queue"}
      end)

      trigger(:join_lobby, "game_queue")

      resolve(&JuralenWeb.GameResolver.get_game_queue/3)
    end
  end
end
