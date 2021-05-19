defmodule JuralenWeb.LobbyResolver do
  alias Juralen.Game.Lobby

  def join_lobby(_root, _args, _info) do
    Lobby.join_lobby()
  end
end
