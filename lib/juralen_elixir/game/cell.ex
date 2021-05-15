defmodule Juralen.Game.Cell do
  defp empty do
    %{
      cell_type: "Plains",
      controlled_by: nil,
      def_bonus: 0,
      structure: nil,
      farms: 0,
      towers: 0,
      x: -1,
      y: -1
    }
  end

  def generate(loc, roll) do
    cond do
      roll <= 12 ->
        %{
          empty()
          | cell_type: "Plains",
            def_bonus: 3,
            structure: "Town",
            x: loc[:x],
            y: loc[:y]
        }

      roll > 12 && roll <= 20 ->
        %{
          empty()
          | cell_type: "Mountain",
            x: loc[:x],
            y: loc[:y]
        }

      roll > 20 && roll <= 40 ->
        %{
          empty()
          | cell_type: "Forest",
            def_bonus: 1,
            x: loc[:x],
            y: loc[:y]
        }

      roll > 40 ->
        %{empty() | x: loc[:x], y: loc[:y]}
    end
  end
end
