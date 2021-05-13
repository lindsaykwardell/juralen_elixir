defmodule JuralenWeb.Schema.UserSchema do
  use Absinthe.Schema.Notation
  alias JuralenWeb.UserResolver

  object :user do
    field :id, :id
    field :name, :string
    field :email, :string
  end

  object :user_queries do
    @desc "Get all users"
    field :all_users, non_null(list_of(non_null(:user))) do
      resolve &UserResolver.all_users/3
    end

    @desc "Log in"
    field :login, :string do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &UserResolver.login/3
    end

    @desc "Current user profile"
    field :profile, :user do
      resolve &UserResolver.profile/3
    end
  end

  object :user_mutations do
    @desc "Register user"
    field :register, non_null(:user) do
      arg :name, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &UserResolver.register/3
    end
  end
end
