defmodule Juralen.Game.Player do
  defp empty do
    %{
      id: UUID.uuid4(),
      name: "",
      resources: %{actions: 1, gold: 2},
      hasLost: false,
      isHuman: false,
      analyzer: nil,
      color: nil,
      score: 2,
      techTree: nil
    }
  end

  
end
