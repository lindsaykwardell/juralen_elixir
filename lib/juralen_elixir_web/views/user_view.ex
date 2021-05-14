defmodule JuralenWeb.UserView do
  use JuralenWeb, :view

  def render("scripts.html", _assigns) do
    ~E(<script defer src="js/user.js"></script>)
  end
end
