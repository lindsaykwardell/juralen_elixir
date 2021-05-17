defmodule JuralenWeb.Schema do
  use Absinthe.Schema

  import_types(JuralenWeb.Schema.UserSchema)
  import_types(JuralenWeb.Schema.GameSchema)

  query do
    import_fields(:user_queries)
    import_fields(:game_queries)
  end

  mutation do
    import_fields(:user_mutations)
    import_fields(:game_mutations)
  end

  subscription do
    field :updated_game, :game do
      arg :uuid, :string

      config fn args, _ ->
        {:ok, topic: args.uuid}
      end

      # trigger :start_game, topic: fn game ->
      #   game[:uuid]
      # end
    end
  end
end
