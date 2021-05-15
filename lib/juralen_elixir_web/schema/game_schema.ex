defmodule JuralenWeb.Schema.GameSchema do
  use Absinthe.Schema.Notation
  alias JuralenWeb.GameResolver

  object :game do
    field :uuid, non_null(:string)
    field :grid, list_of(:cell)
    field :players, list_of(:player)
    field :settings, non_null(:settings)
  end

  object :settings do
    field :max_x, non_null(:integer)
    field :max_y, non_null(:integer)
  end

  input_object :input_settings do
    field :max_x, non_null(:integer)
    field :max_y, non_null(:integer)
  end

  object :player do
    field :uuid, non_null(:string)
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :resources, non_null(:resources)
    field :has_lost, non_null(:boolean)
    field :is_human, non_null(:boolean)
    field :analyzer, :string
    field :color, :string
    field :score, non_null(:integer)
    field :tech_tree, :string
  end

  object :resources do
    field :actions, non_null(:integer)
    field :gold, non_null(:integer)
  end

  object :cell do
    field :cell_type, non_null(:string)
    field :controlled_by, :integer
    field :def_bonus, non_null(:integer)
    field :structure, :string
    field :farms, non_null(:integer)
    field :towers, non_null(:integer)
    field :x, non_null(:integer)
    field :y, non_null(:integer)
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

    @desc "Add player to game"
    field :add_player, :game do
      arg(:uuid, non_null(:string))
      arg(:user_id, non_null(:integer))

      resolve(&GameResolver.add_player/3)
    end

    @desc "Remove a player from a game"
    field :remove_player, :game do
      arg(:uuid, non_null(:string))
      arg(:user_id, non_null(:integer))

      resolve(&GameResolver.remove_player/3)
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
