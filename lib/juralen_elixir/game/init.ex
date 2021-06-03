defmodule Juralen.Game.Init do
  def generate_game() do
    %{
      uuid: UUID.uuid4(),
      grid: [],
      units: [],
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

  def generate_starting_loc(game) do
    generate_starting_loc(game, game[:players])
  end

  def generate_starting_loc(game, players) do
    case length(players) do
      0 ->
        game

      _ ->
        player = hd(players)

        loc = %{
          x: Enum.random(0..game[:settings][:max_x]),
          y: Enum.random(0..game[:settings][:max_y])
        }

        cell = Juralen.Game.Cell.get(game[:grid], loc)

        if cell[:cell_type] != "Plains" || cell[:controlled_by] != nil do
          generate_starting_loc(game, players)
        else
          generate_starting_loc(
            %{
              (game
               |> Juralen.Game.Unit.build("Soldier", loc, player)
               |> Juralen.Game.Unit.build("Soldier", loc, player)
               |> Juralen.Game.Unit.build("Soldier", loc, player))
              | grid:
                  Juralen.Game.Cell.set(
                    game[:grid],
                    %{
                      cell
                      | controlled_by: player[:uuid],
                        structure: "Citadel"
                    }
                  )
            },
            tl(players)
          )
        end
    end
  end
end
