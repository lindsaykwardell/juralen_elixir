defmodule JuralenWeb.GameResolver do
  alias Juralen.Game

  def create_game(_root, args, _info) do
    max_x = args[:x] || 8
    max_y = args[:y] || 8
    Game.create_game(max_x, max_y)
  end

  def get_game(_root, args, _info) do
    Game.get_game(args[:uuid])
  end
end
