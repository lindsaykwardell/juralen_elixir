defmodule JuralenWeb.Context do
  @behaviour Plug

  alias Juralen.Accounts

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    # %{current_user: Map.get(@fakedb, "1")}
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
    {:ok, user} <- authorize(token) do
      %{current_user: user}
    else
      _ -> %{}
    end
  end

  defp authorize(token) do
    case Juralen.Token.verify_and_validate(token) do
      {:ok, claims} ->
        case Accounts.get_user!(claims["user_id"]) do
          nil -> {:error, "invalid authorization token"}
          user -> {:ok, user}
        end
      _ ->
        {:error, "invalid authorization token"}
    end
  end
end
