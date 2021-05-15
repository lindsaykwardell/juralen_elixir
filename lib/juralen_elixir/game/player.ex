defmodule Juralen.Game.Player do
  defp empty do
    %{
      uuid: UUID.uuid4(),
      id: -1,
      name: "",
      resources: %{actions: 1, gold: 2},
      has_lost: false,
      is_human: true,
      analyzer: nil,
      color: nil,
      score: 2,
      tech_tree: nil
    }
  end

  defp new_player(user) do
    %{empty() | id: user.id, name: user.name}
  end

  def add_player(game, user) do
    %{
      game
      | players:
          if Enum.find(game[:players], nil, fn player -> player[:id] == user.id end) == nil do
            [new_player(user) | game[:players]]
          else
            game[:players]
          end
    }
  end

  def remove_player(game, user_id) do
    %{game | players: Enum.filter(game[:players], fn player -> player[:id] !== user_id end)}
  end
end
