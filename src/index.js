import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import AppStateLess from "./StateLess/AppStateless";
import AppStyle from "./AppStyle/AppStyle"

//Only with ES6 classes
ReactDOM.render(<App />, document.getElementById("root"));

//With stateLess components
//ReactDOM.render(<AppStateLess />, document.getElementById("rootStateLess"));

//ReactDOM.render(<AppStyle />, document.getElementById("rootStyle"));
//ReactDOM.render ca peut etre utilisé plusieurs fois mais pour une simple application react
//Le mieux est de l'utiliser qu'une seule fois... mais je pourrais créér un div avec un ID
//et utiliser reactDOM.render plusieurs fois

