defmodule JuralenWeb.GameResolver do
  alias Juralen.Game

  def create_game(_root, _args, _info) do
    Game.create_game()
  end

  def add_player(_root, args, _info) do
    Game.add_player(args[:uuid], args[:user_id])
  end

  def remove_player(_root, args, _info) do
    Game.remove_player(args[:uuid], args[:user_id])
  end

  def update_settings(_root, args, _info) do
    Game.update_settings(args[:uuid], args[:settings])
  end

  def start_game(_root, args, _info) do
    Game.start_game(args[:uuid])
  end

  def get_game(_root, args, _info) do
    Game.get_game(args[:uuid])
  end
end
