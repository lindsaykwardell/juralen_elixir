defmodule Juralen.Game.Settings do
  def generate_settings() do
    %{name: "", max_x: 8, max_y: 8, started: false}
  end

  def update_settings(game, settings) do
    %{game | settings: %{
      max_x: settings[:max_x] || game[:settings][:max_x],
      max_y: settings[:max_y] || game[:settings][:max_y],
      name: settings[:name] || game[:settings][:name],
      started: settings[:started] || game[:settings][:started]
    }}
  end
end
