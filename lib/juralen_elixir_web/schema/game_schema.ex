defmodule JuralenWeb.Schema.GameSchema do
  use Absinthe.Schema.Notation
  alias JuralenWeb.GameResolver

  object :game do
    field :uuid, :string
    field :grid, list_of(:cell)
  end

  object :cell do
    field :cell_type, :string
    field :controlled_by, :integer
    field :def_bonus, :integer
    field :structure, :string
    field :farms, :integer
    field :towers, :integer
    field :x, :integer
    field :y, :integer
  end

  object :game_queries do
    @desc "Get game"
    field :get_game, :game do
      arg :uuid, non_null(:string)

      resolve &GameResolver.get_game/3
    end
  end

  object :game_mutations do
    @desc "Create new game"
    field :create_game, :game do
      arg :x, :integer
      arg :y, :integer

      resolve &GameResolver.create_game/3
    end
  end
end
