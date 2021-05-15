defmodule JuralenWeb.Schema.GameSchema do
  use Absinthe.Schema.Notation
  alias JuralenWeb.GameResolver

  object :game do
    field :uuid, :string
    field :grid, list_of(:cell)
    field :settings, :settings
  end

  object :settings do
    field :max_x, non_null(:integer)
    field :max_y, non_null(:integer)
  end

  input_object :input_settings do
    field :max_x, non_null(:integer)
    field :max_y, non_null(:integer)
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
      arg(:uuid, non_null(:string))

      resolve(&GameResolver.get_game/3)
    end
  end

  object :game_mutations do
    @desc "Create new game"
    field :create_game, :game do
      resolve(&GameResolver.create_game/3)
    end

    @desc "Update settings for a game"
    field :update_game_settings, :game do
      arg(:uuid, non_null(:string))
      arg(:settings, non_null(:input_settings))

      resolve(&GameResolver.update_settings/3)
    end

    @desc "Start the game"
    field :start_game, :game do
      arg(:uuid, non_null(:string))

      resolve(&GameResolver.start_game/3)
    end
  end
end
