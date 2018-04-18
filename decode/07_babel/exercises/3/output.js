var rootdiv = document.getElementById('root');
var elem = React.createElement(
    "div",
    null,
    React.createElement(
        "a",
        { href: "http://www.google.com" },
        "Google.com"
    ),
    React.createElement("div", { id: "somedivid" })
);
ReactDOM.render(elem, rootdiv);
