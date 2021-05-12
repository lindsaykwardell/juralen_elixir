defmodule JuralenWeb.UserResolver do
  alias Juralen.Accounts

  def all_users(_root, _args, _info) do
    {:ok, Accounts.list_users()}
  end

  def register(_root, args, _info) do
    case Accounts.user_by_email(args[:email]) do
      nil -> hash = Bcrypt.add_hash(args[:password])
        case Accounts.create_user(%{
          name: args[:name],
          email: args[:email],
          password_hash: hash[:password_hash]
        }) do
          {:ok, user} ->
            {:ok, user}
          error ->
            {:error, error}
        end
      existingUser ->
        {:ok, existingUser}
    end
  end

  def login(_root, args, _info) do
    case Accounts.user_by_email(args[:email]) do
      nil -> {:error, "invalid user"}
      user ->
        case Bcrypt.check_pass(user, args[:password]) do
          {:error, _} ->
            {:error, "invalid login"}
          _ -> {:ok, Juralen.Token.generate_and_sign!(%{"user_id" => user.id})}
        end
    end

    # case Accounts.get_user!(args[:user_id]) do
    #   nil -> {:error, "invalid user"}
    #   _validUser -> {:ok, Juralen.Token.generate_and_sign!(args)}
    # end
  end

  def profile(_root, _args, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def profile(_root, _args, _info) do
    {:error, nil}
  end
end
