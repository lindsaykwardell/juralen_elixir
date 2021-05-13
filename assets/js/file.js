import { Elm } from "./Main.elm";

const node = document.querySelector("#elm");
console.log(Elm, node);
const app = Elm.Main.init({ node });
