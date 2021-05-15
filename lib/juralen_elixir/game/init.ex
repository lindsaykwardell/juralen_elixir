defmodule Juralen.Game.Init do
  def generate_game() do
    %{
      uuid: UUID.uuid4(),
      grid: [],
      players: [],
      settings: nil
    }
  end

  def generate_grid(game) do
    %{
      game
      | grid: roll_next_cell(%{x: 0, y: 0}, game[:settings][:max_x], game[:settings][:max_y], [])
    }
  end

  def roll_next_cell(loc, max_x, max_y, cells) do
    cell = Juralen.Game.Cell.generate(loc, Enum.random(0..101))
    next_x = if loc[:y] == max_y, do: loc[:x] + 1, else: loc[:x]
    finished = next_x > max_x

    next_y =
      if loc[:y] == max_y do
        if finished do
          loc[:y]
        else
          0
        end
      else
        loc[:y] + 1
      end

    if finished do
      [cell | cells]
    else
      roll_next_cell(%{x: next_x, y: next_y}, max_x, max_y, [cell | cells])
    end
  end
end
