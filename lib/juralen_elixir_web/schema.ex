defmodule JuralenWeb.Schema do
  use Absinthe.Schema

  import_types(JuralenWeb.Schema.UserSchema)
  import_types(JuralenWeb.Schema.GameSchema)
  import_types(JuralenWeb.Schema.LobbySchema)

  query do
    import_fields(:user_queries)
    import_fields(:game_queries)
  end

  mutation do
    import_fields(:user_mutations)
    import_fields(:game_mutations)
    import_fields(:lobby_mutations)
  end

  subscription do
    import_fields(:game_subscriptions)
    import_fields(:lobby_subscriptions)
  end
end
