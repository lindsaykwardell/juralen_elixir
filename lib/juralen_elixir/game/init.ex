defmodule Juralen.Game.Init do
  def generate(max_x, max_y) do
    roll_next_cell(%{x: 0, y: 0}, max_x, max_y, [])
  end

  def roll_next_cell(loc, max_x, max_y, cells) do
    cell = generate_cell(loc, Enum.random(0..101))
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

  def generate_cell(loc, roll) do
    cond do
      roll <= 12 ->
        %{
          cell_type: "Plains",
          controlled_by: nil,
          def_bonus: 3,
          structure: "Town",
          farms: 0,
          towers: 0,
          x: loc[:x],
          y: loc[:y]
        }

      roll > 12 && roll <= 20 ->
        %{
          cell_type: "Mountain",
          controlled_by: nil,
          def_bonus: 0,
          structure: nil,
          farms: 0,
          towers: 0,
          x: loc[:x],
          y: loc[:y]
        }

      roll > 20 && roll <= 40 ->
        %{
          cell_type: "Forest",
          controlled_by: nil,
          def_bonus: 1,
          structure: nil,
          farms: 0,
          towers: 0,
          x: loc[:x],
          y: loc[:y]
        }

      true ->
        %{
          cell_type: "Plains",
          controlled_by: nil,
          def_bonus: 0,
          structure: nil,
          farms: 0,
          towers: 0,
          x: loc[:x],
          y: loc[:y]
        }
    end
  end
end
