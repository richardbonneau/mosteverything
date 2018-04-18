import React from "react"
import ReactDOM from "react-dom"

var root = document.querySelector("#root");
var h1 = React.createElement("h1", null, "hello world");
ReactDOM.render((h1), root);