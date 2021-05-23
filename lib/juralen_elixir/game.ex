defmodule Juralen.Game do
  alias Juralen.Game.Init
  alias Juralen.Game.Player
  alias Juralen.Game.Settings
  alias Juralen.Game.ActiveGames
  alias Juralen.Accounts

  def create_game(user, name) do
    Init.generate_game()
    |> Settings.update_settings(%{Settings.generate_settings() | name: name})
    |> Player.add_player(user)
    |> ActiveGames.update_game()
  end

  def add_player(uuid, id) do
    ActiveGames.get_game!(uuid)
    |> Player.add_player(Accounts.get_user!(id))
    |> ActiveGames.update_game()
  end

  def remove_player(uuid, id) do
    ActiveGames.get_game!(uuid)
    |> Player.remove_player(id)
    |> ActiveGames.update_game()
  end

  def update_settings(uuid, settings) do
    ActiveGames.get_game!(uuid)
    |> Settings.update_settings(settings)
    |> ActiveGames.update_game()
  end

  def start_game(uuid) do
    ActiveGames.get_game!(uuid)
    |> Init.generate_grid()
    |> Settings.update_settings(%{started: true})
    |> ActiveGames.update_game()
  end

  def get_game(uuid) do
    ActiveGames.get_game(uuid)
  end
end
