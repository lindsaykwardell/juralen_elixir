import React from "react";
import ReactDOM from "react-dom";

import Greeter from "../src/greeter";

const greeting = document.getElementById("login");
console.log(greeting)
ReactDOM.render(<Greeter name="Phoenix" />, greeting);
