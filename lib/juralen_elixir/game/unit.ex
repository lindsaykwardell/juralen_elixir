defmodule Juralen.Game.Unit do
  defp empty do
    %{
      uuid: UUID.uuid4(),
      unit_type: "Soldier",
      moves_left: -1,
      attack: 0,
      health: -1,
      range: -1,
      controlled_by: nil,
      x: -1,
      y: -1
    }
  end

  def generate(unit_type) do
    case unit_type do
      "Soldier" ->
        %{empty() | moves_left: 1, attack: 1, health: 2, range: 1}

      "Warrior" ->
        %{empty() | moves_left: 1, attack: 2, health: 2, range: 1}

      "Archer" ->
        %{empty() | moves_left: 1, attack: 1, health: 3, range: 2}

      "Knight" ->
        %{empty() | moves_left: 2, attack: 2, health: 3, range: 1}

      "Rogue" ->
        %{empty() | moves_left: 2, attack: 3, health: 2, range: 1}

      "Wizard" ->
        %{empty() | moves_left: 3, attack: 3, health: 3, range: 2}

      "Priest" ->
        %{empty() | moves_left: 1, attack: 1, health: 5, range: 1}

      _ ->
        empty()
    end
  end

  def cost(unit_type) do
    case unit_type do
      "Soldier" ->
        1

      "Warrior" ->
        2

      "Archer" ->
        2

      "Knight" ->
        4

      "Rogue" ->
        4

      "Wizard" ->
        6

      "Priest" ->
        6

      _ ->
        0
    end
  end

  def threat(unit_type) do
    case unit_type do
      "Soldier" ->
        1

      "Warrior" ->
        2

      "Archer" ->
        2

      "Knight" ->
        3

      "Rogue" ->
        3

      "Wizard" ->
        4

      "Priest" ->
        4

      _ ->
        0
    end
  end

  def move_cost(unit_type) do
    case unit_type do
      "Wizard" ->
        0.25

      _ ->
        1
    end
  end

  def build(game, unit_type, loc, player) do
    %{
      game
      | units: [
          %{generate(unit_type) | x: loc[:x], y: loc[:y], controlled_by: player[:uuid]}
          | game[:units]
        ]
    }
  end
end
