# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Juralen.Repo.insert!(%Juralen.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Juralen.Accounts

hash = Bcrypt.add_hash("password")
Accounts.create_user(%{
  name: "Bob Day",
  email: "bob@martianmovers.com",
  password_hash: hash[:password_hash]
})
