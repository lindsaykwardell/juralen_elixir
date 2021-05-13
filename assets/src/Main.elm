module Main exposing (..)

import Browser
import Html exposing (Html, a, button, code, div, h1, img, p, text)
import Html.Attributes exposing (href, src, style, class)
import Html.Events exposing (onClick)


main : Program () Int Msg
main =
    Browser.sandbox { init = 0, update = update, view = view }


type Msg
    = Increment
    | Decrement


update : Msg -> number -> number
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1


view : Int -> Html Msg
view model =
    div [ class "flex flex-col justify-center items-center text-center" ]
        [ img [ src "./images/logo.png", style "width" "300px" ] []
        , div []
            [ h1 [ class "text-2xl" ] [ text "Hello, Elixir + Elm!" ]
            , p []
                [ a [ href "https://vitejs.dev/guide/features.html" ] [ text "Vite Documentation" ]
                , text " | "
                , a [ href "https://guide.elm-lang.org/" ] [ text "Elm Documentation" ]
                ]
            , button [ class "bg-blue-600 hover:bg-blue-700 transition duration-50 px-4 py-2 text-white rounded shadow hover:shadow-md", onClick Increment ] [ text ("count is: " ++ String.fromInt model) ]
            , p []
                [ text "Edit "
                , code [] [ text "src/Main.elm" ]
                , text " to test auto refresh"
                ]
            ]
        ]
