defmodule JuralenWeb.Schema do
  use Absinthe.Schema

  import_types JuralenWeb.Schema.UserSchema

  query do
    import_fields :user_queries
  end

  mutation do
    import_fields :user_mutations
  end
end
