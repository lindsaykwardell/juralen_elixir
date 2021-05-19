defmodule JuralenWeb.GameResolver do
  alias Juralen.Game

  def get_game_queue(_root, _args, _info) do
    {:ok, Juralen.Game.Lobby.fetch_game_queue()}
  end

  def create_game(_root, args, %{context: %{current_user: current_user}}) do
    Game.create_game(current_user, args[:name] || "New Game")
  end

  def create_game(_root, _args, _info) do
    {:error, "Unauthorized"}
  end

  def join_game(_root, args, %{context: %{current_user: current_user}}) do
    Game.add_player(args[:uuid], current_user.id)
  end

  def join_game(_root, _args, _info) do
    {:error, "Unauthorized"}
  end

  def add_player(_root, args, _info) do
    Game.add_player(args[:uuid], args[:user_id])
  end

  def leave_game(_root, args, %{context: %{current_user: current_user}}) do
    Game.remove_player(args[:uuid], current_user.id)
  end

  def leave_game(_root, _args, _info) do
    {:error, "Unauthorized"}
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
